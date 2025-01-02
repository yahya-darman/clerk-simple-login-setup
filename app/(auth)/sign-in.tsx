import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, Alert } from 'react-native'
import React from 'react'
import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import SignInWithOAuth from '@/components/SignInWithOAuth'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      Alert.alert( "Error", err.errors[0].message);
    }
  }, [isLoaded, emailAddress, password])

  const onSignInWithGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow()

      if (createdSessionId) {
        setActive?.({ session: createdSessionId })
        router.replace('/')
      }
    } catch (err) {
      console.error("OAuth error", err)
    }
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Hello, you are currently seeing sign-in.tsx file in auth layout</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sign In</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={{ width: '100%', marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={{ width: '100%', marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <Button title="Sign in" onPress={onSignInPress} />



      <SignInWithOAuth />

      <View>
        <Text>Don't have an account?</Text>
        <Link href="./sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  )
}