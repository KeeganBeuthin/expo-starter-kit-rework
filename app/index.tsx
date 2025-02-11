import { useState } from 'react';
import { makeRedirectUri, AuthRequest, exchangeCodeAsync } from 'expo-auth-session';
import { openAuthSessionAsync, maybeCompleteAuthSession } from "expo-web-browser";
import { Button, Text, View } from 'react-native';
import Constants from "expo-constants";
import { ExpoSecureStore, mapLoginMethodParamsForUrl, StorageKeys, getClaims, setActiveStorage, setRefreshTimer, refreshToken } from '@kinde/js-utils';
import React from 'react';

maybeCompleteAuthSession();

const KINDE_DOMAIN = 'http://[yourdomain].kinde.com';
const KINDE_REDIRECT_URL = '';
const KINDE_CLIENT_ID = ''

export default function App() {
  const [code, setCode] = useState<string | null>('');
  const redirectUri =
  KINDE_REDIRECT_URL ||
    makeRedirectUri({
      native: Constants.isDevice,
      path: "kinde_callback",
    });

  const store: ExpoSecureStore = new ExpoSecureStore();
  setActiveStorage(store);

  const authenticate = async (
    options = {},
  ) => {

    // check if there is already a session
    const accessToken = await store.getSessionItem(StorageKeys.accessToken);
    
    // valdate the token using validation library e.g. @kinde-oss/jwt-validator
    // if the token is valid, the user is already logged in and can continue. 
    // recommended to start the refresh timer, see example in exchangeCodeAsync callback below


    const request = new AuthRequest({
      clientId: KINDE_CLIENT_ID,
      redirectUri,
      scopes: ['openid','profile','email','offline'],
      responseType: "code",
      extraParams: {
        has_success_page: "true",
        ...mapLoginMethodParamsForUrl(options)
      },
    });

    try {
      const codeResponse = await request.promptAsync(
        {
          authorizationEndpoint: `${KINDE_DOMAIN}/oauth2/auth`,
        },
        {
          showInRecents: true,
        },
      );
  
      if (request && codeResponse?.type === "success") {
        const exchangeCodeResponse = await exchangeCodeAsync(
          {
            clientId: KINDE_CLIENT_ID!,
            code: codeResponse.params.code,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
            redirectUri,
          },
          {
            tokenEndpoint: `${KINDE_DOMAIN}/oauth2/token`,
          },
        );
        setCode(exchangeCodeResponse.accessToken)
   
        await store.setSessionItem(StorageKeys.accessToken, exchangeCodeResponse.accessToken);

        console.log(await getClaims());

        // Sets the refresh token in the secure store.
        store.setSessionItem(
          StorageKeys.refreshToken,
          exchangeCodeResponse.refreshToken,
        );

        // This will start the token refresh, triggering the access and refresh tokens to be refreshed 10 seconds before the access token expires.
        setRefreshTimer(exchangeCodeResponse.expiresIn!, async () => {
          refreshToken({
            domain: KINDE_DOMAIN,
            clientId: KINDE_CLIENT_ID,
          });
        });

        return {
          success: true,
          accessToken: exchangeCodeResponse.accessToken,
          idToken: exchangeCodeResponse.idToken!,
        };
      } else {
        return { success: false, errorMessage: "No code response" };
      }
    } catch (err: any) {
      console.error(err);
      return { success: false, errorMessage: err.message };
    }
  };

  if (code) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>You are now logged in!</Text>
        <Text>{code}</Text>
        <Button
          title="Logout"
          onPress={ () => {
            setCode(null);
          }}
        />
      </View>
    )
  }

  return (
 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Login"
        onPress={() => {
          authenticate({ prompt: "login" });
        }}
      />
      <Button
        title="Logout"
        onPress={async() => {
          await openAuthSessionAsync(`${KINDE_DOMAIN}/logout?redirect=${redirectUri}`);
        }}
      />
    </View>
  );
}
