import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
// Components
import Spinner from "@/components/ui/Spinner/Spinner";

export default function Home() {
  const [status, setStatus] = useState(0 as number);
  //0: Loading
  //1: Idle

  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user !== undefined) {
      router.push("/projects");
    } else if (isLoading) {
      setStatus(0);
    } else {
      setStatus(1);
    }
  }, [router, user, isLoading]);

  return status === 0 ? (
    <div className="mx-auto my-8">
      <Spinner size={3} />
    </div>
  ) : (
    <div className="h-full w-full">
      <Head>
        <title>Tick</title>
        <meta name="description" content="Tick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full flex flex-col mx-w-screen-sm md:flex-row md:mx-w-screen-2xl">
        <div className="h-96 md:h-full md:w-2/4">
          <div className="home-background-image">
            <Image
              src={"/images/patterns/coral_texture.svg" as any}
              alt="Blue and green background pattern"
              layout="fill"
              objectFit="cover"
              objectPosition="left"
            />
          </div>
          <div className="absolute top-6 p-6 flex flex-col md:top-32 lg:top-40 md:px-10">
            <div className="font-heading font-bold text-theme_dawn_pink text-5xl mb-8">
              tick
            </div>
            <div className="font-primary font-bold text-white text-3xl mb-4 lg:text-4xl xl:text-5xl">
              Take Control of
              <br />
              Your Side Projects.
            </div>
            <div className="font-secondary font-light text-white text-xl mb-8">
              Manage your projects with ease.
              <br />
              Sign up now!
            </div>
          </div>
        </div>
        <div className="mb-10 md:mb-0 md:h-full md:w-2/4">
          <div className="px-6 pt-8 md:pt-40 md:px-8">
            <div className="mb-3 font-primary font-extrabold text-4xl md:text-5xl lg:text-6xl">
              Log In.
            </div>
            <div className="font-secondary font-regular text-base mb-12">
              Get started on building your next <strong>big thing</strong>.
            </div>
            <Link href="/api/auth/login">
              <a
                className="w-12 bg-theme_green px-12 py-4 text-white text-lg font-bold rounded-md"
                onClick={() => setStatus(0)}
              >
                Sign In
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
