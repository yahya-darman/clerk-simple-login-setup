// import { Link } from 'expo-router'

import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, View, TouchableOpacity} from 'react-native'
import Dialog from "react-native-dialog"

import { useState } from 'react'

export default function IndexScreen() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { signOut } = useAuth();

  return(
    <View>
      <TouchableOpacity 
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
        }}
        onPress={() => setDialogOpen(true)}
      > 
        <MaterialCommunityIcons name="exit-run" size={24} color="blue" />

        <Dialog.Container visible={dialogOpen}>
          <Dialog.Title>Sign Out</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to sign out?
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={() => setDialogOpen(false)} />
          <Dialog.Button 
            label="Sign Out"
            onPress={async() => {
              await signOut(); 
              setDialogOpen(false);
            }}
          />
        </Dialog.Container>
      </TouchableOpacity>


      <Text>Hello, you are currently seeing index.tsx file in home layout</Text>
      <SignedIn>
        <Text>You are signed in</Text>
      </SignedIn>
    </View>
  )
}

// export default function Page() {
//   const { user } = useUser()

//   return (
//     <View style={styles.container}>
//       <Text>Hello, you are currently seeing index.tsx file in home layout</Text>
//       <SignedIn>
//         <Text style={styles.greeting}>
//           Hello, {user?.emailAddresses[0].emailAddress}! 👋
//         </Text>
//       </SignedIn>

//       <SignedOut>
//         <View style={styles.authButtons}>
//           <Link href="../(auth)/sign-in" asChild>
//             <Pressable style={styles.link}>
//               <Text style={styles.linkText}>Sign in</Text>
//             </Pressable>
//           </Link>
//           <Link href="../(auth)/sign-up" asChild>
//             <Pressable style={styles.link}>
//               <Text style={styles.linkText}>Sign up</Text>
//             </Pressable>
//           </Link>
//         </View>
//       </SignedOut>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   greeting: {
//     fontSize: 18,
//     color: '#666',
//     marginBottom: 20,
//   },
//   authButtons: {
//     gap: 10,
//     alignItems: 'center',
//   },
//   link: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     marginVertical: 5,
//     minWidth: 200,
//     alignItems: 'center',
//   },
//   linkText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// })