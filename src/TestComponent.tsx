import { observer } from "mobx-react-lite";
import TestComponentState from "./TestComponentState";
import { useStore } from "./State";

export const TestComponent = observer((props) => {
  const state = useStore(TestComponentState, { bar: 5 });

  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Default
      </button>
      <a
        href="#"
        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {state.queryResult}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {JSON.stringify(state.postUser.error)}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In temporibus
          at consectetur optio laborum voluptatem rem tenetur sunt obcaecati
          minima sequi laudantium corporis facere, culpa quas, eligendi
          aspernatur quod nisi?
        </p>
      </a>
      Test Component
      <br />
      <br />
      state.computedExample:
      <br /> {state.getterExample}
      <br />
      <br />
      state.observableFoo:
      <br /> {state.observableFoo}
      <br />
      <br />
      state.observableBar:
      <br /> {state.observableBar}
      <br />
      <br />
      state.handleClickIncrement:
      <br /> <button onClick={state.handleClickIncrement}>increment</button>
      <br />
      <br />
      state.handleClickCopy:
      <br /> <button onClick={state.handleClickCopy}>assign foo to bar</button>
      <br />
      <br />
      state.computedFooBar:
      <br /> {state.computedFooBar}
    </>
  );
});
