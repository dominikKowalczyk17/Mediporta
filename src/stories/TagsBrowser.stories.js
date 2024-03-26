import React from "react";
import TagsBrowser from "../components/TagsBrowser";

export default {
  title: "TagsBrowser",
  component: TagsBrowser,
};

const Template = (args) => <TagsBrowser {...args} />;

export const Default = Template.bind({});
Default.args = {};
