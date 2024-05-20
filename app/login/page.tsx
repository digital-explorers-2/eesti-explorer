import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (

       <div className="flex-1 flex flex-col ">
       <img src="/image.png"  alt="No image" width={200} height={400} margin-top={80} />
      
      <Link
        href="/"
        className="animate-in absolute left-20 top-20 py-1 px-10 no-underline  flex items-center text-black font-roboto font-semibold bg-orange-500 
        hover:bg-white
        hover:text-orange-500 hover:border-orange-500 border-2 border-transparent rounded-md transition duration-300 ease-in-out "
      >
        Back
      </Link>

      <div className="animate-in flex items-center justify-center h-screen">
      <div className="bg-orange-50 p-8 rounded-lg shadow-lg text-black font-roboto font-semibold border-orange-500 border-2">
      <form className="w-96 flex flex-col justify-center gap-2 ">

        <label className="text-md" htmlFor="email">
          Email
        </label>

        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6" 
          name="email"
          placeholder="you@example.com"
          required
        />

        <label className="text-md" htmlFor="password">
          Password
        </label>

        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <SubmitButton
          formAction={signIn}
          className="bg-orange-500 rounded-md px-4 py-2  mb-2 text-black hover:bg-white
          hover:text-orange-500 hover:border-orange-500 border-2 border-transparent rounded-md transition duration-300 ease-in-out "
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>

        <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2  mb-2 text-black hover:bg-white
          hover:text-orange-500 hover:border-orange-500 border-2 border-transparent rounded-md transition duration-300 ease-in-out"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center   ">
            {searchParams.message}
          </p>
        )}

      
        
    </form>
    </div>
    

    </div>
    </div>

  );
}
