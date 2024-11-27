import dotEnv from "dotenv";
dotEnv.config();

import crypto from "node:crypto";

type Config = {
  listVisitors: string[];
  isExist: boolean;
  currentUser: string;
  PORT: string | number;
  visitorsLength: number;
  JWT_Refresh: string;
  JWT_Access: string;
  base_path: string;
  base_url: string;
};

export const config: Config = {
  listVisitors: [],
  isExist: false,
  currentUser: "",
  PORT: process.env.PORT as string | number,
  visitorsLength: 0,
  JWT_Refresh: "b4de9fbc-75b9-42fe-baaa-cf4567fd018b",
  JWT_Access: "c7120c07-8318-4939-8a14-6cdb98f6e81f",
  base_path: "/api/v1/",
  base_url: "http://localhost:" + process.env.PORT,
};
