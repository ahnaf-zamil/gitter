import { ReactNode, useContext, useEffect, useState } from "react";
import { tryAuth, userContext } from "../lib/context";
import { LoginRequired } from "./LoginRequired";

interface Props {
  page: ReactNode;
  loginRequired?: boolean;
}

export const AppPage: React.FC<Props> = ({ page, loginRequired }) => {
  const authCtx = useContext(userContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!loginRequired) {
      tryAuth(authCtx).then(() => {
        setShow(true);
      });
    }
  }, []);

  if (loginRequired) {
    return (
      <main>
        <LoginRequired page={page} />
      </main>
    );
  }

  return (
    <main>
      {show && (
        <>
          {!authCtx.user ? (
            <div className="absolute bottom-0 w-full bg-blue-500 flex justify-between py-4 px-12">
              <div>
                <h1 className="text-2xl font-semibold">
                  Don't miss on the interactions
                </h1>
                <h2>Join Twitter Clone and be a part of the community</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    (window.location.href = `/login?redirect=${encodeURIComponent(
                      window.location.pathname
                    )}`)
                  }
                  className="rounded-full text-black bg-gray-200 h-10 font-semibold px-5"
                >
                  Log In
                </button>
                <button
                  onClick={() =>
                    (window.location.href = `/signup?redirect=${encodeURIComponent(
                      window.location.pathname
                    )}`)
                  }
                  className="rounded-full border border-white h-10 font-semibold px-5"
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : null}
          {page}
        </>
      )}
    </main>
  );
};
