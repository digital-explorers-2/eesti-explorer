"use client"
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Button } from "@/components/ui/button"
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";



export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const supabase = createClient();

  const customTheme = {
    default: {
      colors: {
        brand: 'hsl(27, 100%, 60%)', 
        brandAccent: 'hsl(27, 100%, 50%)', 
        brandButtonText: 'white', 
        inputBackground: 'hsl(30, 100%, 97%)', 
        inputPlaceholder: 'hsl(0, 0%, 70%)', 
        buttonText: 'white', 
        buttonBackground: 'hsl(27, 100%, 60%)', // Orange background for buttons
        buttonBackgroundHover: 'hsl(27, 100%, 50%)', // Darker orange on hover
        background: 'hsl(30, 100%, 97%)', // Light cream background for the form
        text: 'hsl(0, 0%, 20%)', // Dark text for general text
      },
      space: {
        spaceSmall: '4px',
        spaceMedium: '8px',
        spaceLarge: '16px',
        labelBottomMargin: '8px',
        anchorBottomMargin: '4px',
        emailInputSpacing: '4px',
        socialAuthSpacing: '4px',
        buttonPadding: '10px 15px',
        inputPadding: '10px 15px',
      },
      fontSizes: {
        baseBodySize: '13px',
        baseInputSize: '17px',
        baseLabelSize: '17px',
        baseButtonSize: '17px',
      },
      radii: {
        borderRadiusButton: '4px',
        buttonBorderRadius: '4px',
        inputBorderRadius: '4px',
      },
    },
    dark: {
      colors: {
        brandButtonText: 'white',
        defaultButtonBackground: '#2e2e2e',
        defaultButtonBackgroundHover: '#3e3e3e',
       
      },
    },
    evenDarker: {
      colors: {
        brandButtonText: 'white',
        defaultButtonBackground: '#1e1e1e',
        defaultButtonBackgroundHover: '#2e2e2e',
  
      },
    },
  };



  // const signIn = async (formData: FormData) => {
  //   "use server";

  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/protected");
  // };

  // const signUp = async (formData: FormData) => {
  //   "use server";

  //   const origin = headers().get("origin");
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${origin}/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/login?message=Check email to continue sign in process");
  // };

  // const signInWithGoogle = async () => {
  //   "use server";

  //   const supabase = createClient();
  //   const { error} = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: `${headers().get("origin")}/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/protected");
  // }


  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <div className="max-w-md py-16 px-16 mx-auto bg-white rounded-xl shadow-2xl shadow-orange-500/50 space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 outline outline-offset-2 outline-orange-500">
              <Auth
        supabaseClient={supabase}
        appearance={{ theme: customTheme }}
        providers={['google']}
      
      />
      </div>

    </div>
    //   <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    //     <Link
    //       href="/"
    //       className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="24"
    //         height="24"
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
    //       >
    //         <polyline points="15 18 9 12 15 6" />
    //       </svg>{" "}
    //       Back
    //     </Link>

    //     <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
    //       <label className="text-md" htmlFor="email">
    //         Email
    //       </label>
    //       <input
    //         className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //         name="email"
    //         placeholder="you@example.com"
    //         required
    //       />
    //       <label className="text-md" htmlFor="password">
    //         Password
    //       </label>
    //       <input
    //         className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //         type="password"
    //         name="password"
    //         placeholder="••••••••"
    //         required
    //       />
    //       <SubmitButton
    //         formAction={signIn}
    //         className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
    //         pendingText="Signing In..."
    //       >
    //         Sign In
    //       </SubmitButton>
    //       <SubmitButton
    //         formAction={signUp}
    //         className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
    //         pendingText="Signing Up..."
    //       >
    //         Sign Up
    //       </SubmitButton>
    //       {/* <Button
    //         onClick={signInWithGoogle}
    //         className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
    //       >
    //         Sign Up With Google
    //       </Button> */}
    //       {searchParams?.message && (
    //         <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
    //           {searchParams.message}
    //         </p>
    //       )}
    //     </form>
    //   </div>
  );
}
