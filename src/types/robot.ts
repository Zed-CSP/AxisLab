export interface UrdfData {
  name?: string;
  description?: string;
  mass?: number;
  dofs?: number;
  joints?: {
    revolute?: number;
    prismatic?: number;
    continuous?: number;
    fixed?: number;
    other?: number;
  };
  links?: {
    name?: string;
    mass?: number;
  }[];
  materials?: {
    name?: string;
    percentage?: number;
  }[];
  // Add id and files for compatibility
  id?: string;
  files?: Record<string, File>;
}

export interface RobotFileModel {
  path: string;
  blobUrl: string;
  name?: string;
}

export type RobotFilesPayload = {
  owner: string;
  name: string;
  files: Record<string, File>;
  primary: {
    type: RobotFileType;
    path: string; // key in files map (normalized, leading '/')
  };
};

export type RobotFileType = "URDF" | "MJCF" | "USD";

export interface ExampleRobot {
  display_name: string;
  owner: string; // e.g., "placeholder"
  repo_name: string; // slug
  fileType: RobotFileType;
  path?: string;
  imagePath?: string;
}

export interface RobotFile {
  type: RobotFileType;
  file: RobotFileModel;
}

// Robot table structure
export interface Robot {
  repo_owner: string;
  repo_name: string;
  updated_at: string;
  github_url: string | null;
  visibility: string;
  more_info_link: string | null;
  urdf_url: string | null;
  display_name: string | null;
  created_at: string;
  image_url: string | null;
  description: string | null;
  sdk_languages: string[] | null;
  tags: string[] | null;
}

// Interface for joint limits
export interface JointLimit {
  lower: number;
  upper: number;
  effort?: number;
  velocity?: number;
}

// Map of joint names to their limits
export interface JointLimits {
  [jointName: string]: JointLimit;
}
