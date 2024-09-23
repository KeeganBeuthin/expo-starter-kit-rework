import { useState } from 'react';
import { makeRedirectUri, AuthRequest, exchangeCodeAsync } from 'expo-auth-session';
import { openAuthSessionAsync, maybeCompleteAuthSession } from "expo-web-browser";
import { Button, Text, View } from 'react-native';
import Constants from "expo-constants";
import { ExpoSecureStore, mapLoginMethodParamsForUrl, StorageKeys, getClaims, setActiveStorage } from '@kinde/js-utils';
import React from 'react';

maybeCompleteAuthSession();

const domain = process.env.EXPO_PUBLIC_KINDE_DOMAIN

export default function App() {
  const [code, setCode] = useState<string | null>('');
  const redirectUri =
    process.env.EXPO_PUBLIC_KINDE_REDIRECT_URL ||
    makeRedirectUri({
      native: Constants.isDevice,
      path: "kinde_callback",
    });

  const store: ExpoSecureStore = new ExpoSecureStore();
  setActiveStorage(store);

  const authenticate = async (
    options = {},
  ) => {
    const request = new AuthRequest({
      clientId: process.env.EXPO_PUBLIC_KINDE_CLIENT_ID!,
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
          authorizationEndpoint: `${domain}/oauth2/auth`,
        },
        {
          showInRecents: true,
        },
      );
  
      if (request && codeResponse?.type === "success") {
        const exchangeCodeResponse = await exchangeCodeAsync(
          {
            clientId: process.env.EXPO_PUBLIC_KINDE_CLIENT_ID!,
            code: codeResponse.params.code,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
            redirectUri,
          },
          {
            tokenEndpoint: `${domain}/oauth2/token`,
          },
        );
        setCode(exchangeCodeResponse.accessToken)
   
        await store.setSessionItem(StorageKeys.accessToken, exchangeCodeResponse.accessToken);

        console.log(await getClaims());

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
          await openAuthSessionAsync(`${domain}/logout?redirect=${redirectUri}`);
        }}
      />
    </View>
  );
}
