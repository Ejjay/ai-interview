export const dynamic = 'force-dynamic'

import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import ErrorBoundary from '@/components/ErrorBoundary';
import { Loader } from "@/components/ui/loader";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <ErrorBoundary>
        <div className="flex items-center justify-center min-h-screen">
          <p>Please log in to continue.</p>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="animate-spin" />
        </div>
        
        <h3>Interview generation</h3>

        <Agent
          userName={user?.name || ''}
          userId={user?.id}
          profileImage={user?.profileURL}
          type="generate"
        />
      </>
    </ErrorBoundary>
  );
};

export default Page;