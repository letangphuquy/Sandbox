import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
})

import connectToDB from '@/utils/database'
import User from '@/models/User'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            const user = await User.findOne({email: session.user.email})
            session.user.id = user._id.toString();
            return session;
        },
        async signIn({account, profile, user, credentials}) {
            try {
                await connectToDB();
                // check existed user
                const findResult = await User.findOne({ email: profile.email})
                console.log("Find result: ", findResult)
                // create new
                if (findResult == null) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replaceAll(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error)
            }
            return false;
        }
    }
})

export {handler as GET, handler as POST}