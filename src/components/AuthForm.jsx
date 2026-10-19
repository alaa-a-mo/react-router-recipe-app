import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

export default function AuthForm() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchParams] = useSearchParams();
  const isLogin = (searchParams.get("mode") || "login") === "login";
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white mb-2">
          {isLogin ? "Welcome back" : "Sign up"}
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {isLogin
            ? "Please sign in to your account"
            : "Please sign up to create an account"}
        </p>

        {actionData?.error && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="name@example.com"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder="••••••••"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer px-6 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
          {isLogin && (
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/auth?mode=signup"
                className="text-indigo-400 hover:text-indigo-500 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          )}
          {!isLogin && (
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/auth?mode=login"
                className="text-indigo-400 hover:text-indigo-500 transition-colors"
              >
                Sign in
              </Link>
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}
