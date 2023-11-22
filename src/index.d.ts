export interface TestConfig {
	/**
	 * If `true`, a warning will be shown if a test takes longer than
	 * `timeoutWarningDelay` seconds to complete.
	 *
	 * @default true
	 */
	showTimeoutWarning?: boolean;
	/**
	 * The number of seconds to wait before showing a timeout warning.
	 *
	 * @default 15
	 */
	timeoutWarningDelay?: number;
	/**
	 * If `true`, all tests will run concurrently.
	 *
	 * @default false
	 */
	concurrent?: boolean;
}

/**
 * Runs the tests in the given root instance.
 *
 * Test modules must contain the `.test` suffix, and should return a function
 * that defines the tests.
 *
 * **Note:** The `concurrent` option should only be used if your tests do not
 * affect each other at all. If used, tests should not access variables other
 * tests access. The code that is being tested should also not contain any
 * global state.
 *
 * @param root The root instance containing the tests
 * @param config The configuration for the test runner
 * @yields
 *
 * @see https://nezuo.github.io/midori/api/Midori#runTests
 */
export function runTests(root: Instance, config?: TestConfig): void;

/**
 * The interface passed to the test modules executed by `runTests`.
 *
 * @see https://nezuo.github.io/midori/api/x
 */
export interface TestProps<Context extends object = {}> {
	/**
	 * Throws an error if the given values are not equal.
	 *
	 * @see https://nezuo.github.io/midori/api/Midori#assertEqual
	 */
	readonly assertEqual: <T>(actual: any, expected: T) => actual is T;
	/**
	 * Creates a new test inside the current scope. The test is called with a
	 * unique `context` object that can be modified by `beforeEach` and cleaned
	 * up by `afterEach`.
	 *
	 * @param name The name of the test.
	 * @param callback The function to test.
	 *
	 * @see https://nezuo.github.io/midori/api/x#test
	 */
	readonly test: (name: string, callback: (context: Context) => void) => void;
	/**
	 * Creates a new test inside the current scope. If any test in the current
	 * scope is marked as `FOCUS`, only those tests will run.
	 *
	 * @param name The name of the test.
	 * @param callback The function to test.
	 *
	 * @see https://nezuo.github.io/midori/api/x#testFOCUS
	 */
	readonly testFOCUS: (name: string, callback: (context: Context) => void) => void;
	/**
	 * Creates a new test inside the current scope. If any test in the current
	 * scope is marked as `SKIP`, none of the tests will run.
	 *
	 * @param name The name of the test.
	 * @param callback The function to test.
	 *
	 * @see https://nezuo.github.io/midori/api/x#testSKIP
	 */
	readonly testSKIP: (name: string, callback: (context: Context) => void) => void;
	/**
	 * Runs `callback` before each test in the current scope. The callback
	 * receives a `context` object unique to each test, which can be used to
	 * share setup code between tests.
	 *
	 * @param callback The function to run before each test.
	 *
	 * @see https://nezuo.github.io/midori/api/x#beforeEach
	 */
	readonly beforeEach: (callback: (context: Context) => void) => void;
	/**
	 * Runs `callback` after each test in the current scope. The callback
	 * receives the `context` object unique to that test, which can be used to
	 * clean up state.
	 *
	 * @param callback The function to run after each test.
	 *
	 * @see https://nezuo.github.io/midori/api/x#afterEach
	 */
	readonly afterEach: (callback: (context: Context) => void) => void;
	/**
	 * Creates a nested scope for tests. Used to group tests by feature.
	 *
	 * @param name The name of the nested scope.
	 * @param callback The function containing the nested tests.
	 *
	 * @see https://nezuo.github.io/midori/api/x#nested
	 */
	readonly nested: (name: string, callback: () => void) => void;
	/**
	 * Throws if `callback` does not throw an error containing `substring`. If
	 * `substring` is not provided, the error message is not checked.
	 *
	 * @param callback The function to test.
	 * @param substring The substring to search for in the error message.
	 *
	 * @see https://nezuo.github.io/midori/api/x#shouldThrow
	 */
	readonly shouldThrow: (callback: () => void, substring?: string) => void;
}
