import * as React from "react";
import AppMenu from "./components/AppMenu/AppMenu";

// routing, etc.

export class App extends React.Component {
  public render() {
    return (
      <div>
        <AppMenu />
        <div>Hello world.</div>
      </div>
    );
  }
}
