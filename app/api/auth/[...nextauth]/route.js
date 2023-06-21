import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { databaseConnection } from '@utils/database_connection';
import User from '@models/user';

const handler =  NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_ID_SECRET,
    }),
    ],
    
  callbacks: {
    async signIn({ profile }) {
      try {
        await databaseConnection();

        //This connectin is basically for inserting sign in user into the database

        //If User is already exist
        const userExists = await User.findOne({ email: profile.email });

        //If user is already not exist
          if (!userExists) { 
            await User.create({
              email: profile.email,
              image: profile.picture,
              username: profile.name.replace(' ', '').toLowerCase(),
            })
          }  

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser?._id;

        return session;
      } catch (error) {
        console.log(error);
      }
    }
  }
      
});

export { handler as GET, handler as POST };