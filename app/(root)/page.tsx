import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

import Spline from '@splinetool/react-spline';

export const dynamic = "force-dynamic"; // Ensures fresh data on every request

async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold">You need to sign in first</h2>
        <Button asChild className="btn-primary mt-4">
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
      </section>
    );
  }

  let userInterviews = null;
  let allInterview = null;

  try {
    if (user?.id) {
      [userInterviews, allInterview] = await Promise.all([
        getInterviewsByUserId(user.id),
        getLatestInterviews({ userId: user.id }),
      ]);
    }
  } catch (error) {
    console.error("Error fetching interview data:", error);
  }

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <div className="max-sm:hidden w-[400px] h-[400px]">
          <Spline scene="https://prod.spline.design/a0IsD2C6HpRtbyKI/scene.splinecode" />
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
