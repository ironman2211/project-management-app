// @/components/DummyPage.js
import React from "react";
import Layout from "./Layout";

export default function BasePage({ title, children }: any) {
  return <Layout pageTitle={title}>{children}</Layout>;
}
