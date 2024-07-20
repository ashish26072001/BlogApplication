
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from"bcryptjs"
import connect from "@/utils/db";
const handler= NextAuth({
    providers: [GoogleProvider({clientId:process.env.AUTH_GOOGLE_ID,
                        clientSecret:process.env.AUTH_GOOGLE_SECRET}),
                        CredentialsProvider({
                            id: "credentials",
                            name: "Credentials",
                            async authorize(credentials) {
                              //Check if the user exists.
                              await connect();
                      
                              try {
                                const user = await User.findOne({
                                  email: credentials.email,
                                });
                      
                                if (user) {
                                  const isPasswordCorrect = await bcrypt.compare(
                                    credentials.password,
                                    user.password
                                  );
                      
                                  if (isPasswordCorrect) {
                                    return user;
                                  } else {
                                    throw new Error("Wrong Credentials!");
                                  }
                                } else {
                                  throw new Error("User not found!");
                                }
                              } catch (err) {
                                throw new Error(err);
                              }
                            },
                          }),
                    
                    ],
                    pages:{error:"/dashboard/login"}
});
export {handler as GET,handler as POST};
 
