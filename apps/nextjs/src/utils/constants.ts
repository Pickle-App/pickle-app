import { Profiles } from "@pickle-app/db";

export enum StatesList {
  ALABAMA = "ALABAMA",
  ALASKA = "ALASKA",
  ARIZONA = "ARIZONA",
  ARKANSAS = "ARKANSAS",
  CALIFORNIA = "CALIFORNIA",
  COLORADO = "COLORADO",
  CONNECTICUT = "CONNECTICUT",
  DELAWARE = "DELAWARE",
  FLORIDA = "FLORIDA",
  GEORGIA = "GEORGIA",
  HAWAII = "HAWAII",
  IDAHO = "IDAHO",
  ILLINOIS = "ILLINOIS",
  INDIANA = "INDIANA",
  IOWA = "IOWA",
  KANSAS = "KANSAS",
  KENTUCKY = "KENTUCKY",
  LOUISIANA = "LOUISIANA",
  MAINE = "MAINE",
  MARYLAND = "MARYLAND",
  MASSACHUSETTS = "MASSACHUSETTS",
  MICHIGAN = "MICHIGAN",
  MINNESOTA = "MINNESOTA",
  MISSISSIPPI = "MISSISSIPPI",
  MISSOURI = "MISSOURI",
  MONTANA = "MONTANA",
  NEBRASKA = "NEBRASKA",
  NEVADA = "NEVADA",
  NEW_HAMPSHIRE = "NEW_HAMPSHIRE",
  NEW_JERSEY = "NEW_JERSEY",
  NEW_MEXICO = "NEW_MEXICO",
  NEW_YORK = "NEW_YORK",
  NORTH_CAROLINA = "NORTH_CAROLINA",
  NORTH_DAKOTA = "NORTH_DAKOTA",
  OHIO = "OHIO",
  OKLAHOMA = "OKLAHOMA",
  OREGON = "OREGON",
  PENNSYLVANIA = "PENNSYLVANIA",
  RHODE_ISLAND = "RHODE_ISLAND",
  SOUTH_CAROLINA = "SOUTH_CAROLINA",
  SOUTH_DAKOTA = "SOUTH_DAKOTA",
  TENNESSEE = "TENNESSEE",
  TEXAS = "TEXAS",
  UTAH = "UTAH",
  VERMONT = "VERMONT",
  VIRGINIA = "VIRGINIA",
  WASHINGTON = "WASHINGTON",
  WEST_VIRGINIA = "WEST_VIRGINIA",
  WISCONSIN = "WISCONSIN",
  WYOMING = "WYOMING",
}
export interface profileType {
  clerk_user_id: string;
  self_skill_rating: number;
  community_skill_rating?: number;
  bio?: string;
  age?: number;
  city: string;
  state: StatesList;
  setup_skip_count?: number;
  has_user_profile?: boolean;
}
export const profileInitialState: Profiles = {
  clerk_user_id: "",
  self_skill_rating: 0.0,
  community_skill_rating: 0.0,
  bio: "",
  age: 0,
  city: "",
  state: StatesList.WASHINGTON,
  setup_skip_count: 0,
  has_user_profile: false,
};
