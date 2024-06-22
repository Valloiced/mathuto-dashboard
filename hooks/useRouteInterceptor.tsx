/** I really want to give credits to: https://www.reddit.com/user/Ukpersfidev/ */
/** For his/her solution: https://www.reddit.com/r/nextjs/comments/14e8f99/prevent_route_change_on_condition_in_nextjs_13/ */
/** I love you so much bro */

import { AppRouterContext, AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { use, useEffect } from "react";

export const useInterceptAppRouter = <TMethod extends keyof AppRouterInstance>(
    method: TMethod,
    interceptFn: (
      original: AppRouterInstance[TMethod],
      ...args: Parameters<AppRouterInstance[TMethod]>
    ) => void
  ) => {
    const appRouter = use(AppRouterContext);
  
    useEffect(() => {
      if (!appRouter)
        throw new Error(
          'useInterceptAppRouter must be used within an App Router context'
        );
      const originalMethod = appRouter[method];
  
      appRouter[method] = ((...args: Parameters<AppRouterInstance[TMethod]>) => {
        interceptFn(originalMethod, ...args);
      }) as AppRouterInstance[TMethod];
  
      return () => {
        appRouter[method] = originalMethod;
      };
    }, [appRouter, method, interceptFn]);
};

export default function useRouteInterceptor(shouldConfirm: boolean, message?: string) {
  useEffect(() => {
    const showSaveConfirmation = (e: any) => {
        if (!shouldConfirm) {
            e.preventDefault();
        }
        e.returnValue = '';
        return '';
    };

    window.addEventListener('beforeunload', showSaveConfirmation);
    
    return () => {
      window.removeEventListener('beforeunload', showSaveConfirmation);
    }
  }, []);  
  
  const handleIntercept = (proceed: () => void) => {
        if (!shouldConfirm) {
          return proceed();
        }
        const shouldProceed = window.confirm(
          message || 'You have unsaved changes. Are you sure you want to leave?'
        );
        if (shouldProceed) {
          proceed();
        }
      };

    useInterceptAppRouter('back', (original, ...args) => {
        handleIntercept(() => original(...args))
    });

    useInterceptAppRouter('push', (original, ...args) => {
        handleIntercept(() => original(...args));
    });
    
    useInterceptAppRouter('replace', (original, ...args) => {
        handleIntercept(() => original(...args));
    });
}

