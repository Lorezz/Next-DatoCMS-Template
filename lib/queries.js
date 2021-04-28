const userFrag = `
fragment userFragment on User {
  id
  userName
  avatarImage {
    url
  }
  token
}
`;

const ownerFrag = `
fragment ownerFragment on UserLocation {
  id
  userName
  status
  reportCounter
  avatarImage {
    url
  }
  numberFlags
  numberFollowers
  numberFollowing
  flags {
    id
  }
  posts {
    id
  }
}
`;

const locationFrag = `
fragment locationFragment on Location {
  id
  name
  address
  kind
  latitude: lat
  longitude: lon
  placeId
  iconUrl
}
`;

const postFrag = `
fragment postFragment on Post {
  id
  status
  deletedAt
  flagId
  description
  createdAt
  updatedAt
  image {
    id
    url
  }
  user {
    ...ownerFragment
  }
}
`;

const flagFrag = `
fragment flagFragment on Flag {
  id
  status
  createdAt
  updatedAt
  location {
    ...locationFragment
  }
  user {
    ...ownerFragment
  }
  posts {
    ...postFragment
  }
}
`;

const reportFrag = `
fragment reportFragment on Report {
   id
    status
    motivationNote
    motivationType
    reportedPostId
    reportedUserId
    reporterUserId
    createdAt
    updatedAt
    deletedAt
}
`;

export const mine = `
query mine {
  me {
    ...userFragment
    locations {
      ...locationFragment
    }
    flags {
      ...flagFragment
    }
    following {
      ...ownerFragment
    }
  }
}
${flagFrag}
${userFrag}
${postFrag}
${locationFrag}
${ownerFrag}
`;

export const getFlag = `
query getFlag($id: ID!) {
  flag: getFlag(id: $id) {
    ...flagFragment
  }
}
${flagFrag}
${postFrag}
${locationFrag}
${ownerFrag}
`;

export const getLocation = `
query getLocation($data: ID!) {
  location: getLocation(id: $data) {
    ...locationFragment
     flags{
        ...flagFragment
    }
  }
}
${locationFrag}
${ownerFrag}
${postFrag}
${flagFrag}
`;

export const getPlace = `
query getPlace($data: String!) {
  place: getPlace(placeId: $data) {
    ...locationFragment
    flags{
        ...flagFragment
    }
  }
}
${locationFrag}
${ownerFrag}
${postFrag}
${flagFrag}
`;

export const locations = `
query locations($lon: Float!, $lat: Float!, $range: Int!) {
  locations: getLocations(lon: $lon, lat: $lat, range: $range) {
    ...locationFragment
    users {
      ...ownerFragment
    }
    posts {
      ...postFragment
    }
  }
}
${locationFrag}
${ownerFrag}
${postFrag}
`;

export const flags = `
query getFlags {
  flags: getFlags {
    ...flagFragment
  }
}
${flagFrag}
${locationFrag}
${postFrag}
${ownerFrag}
`;

export const posts = `
query posts {
  posts: getPosts {
    ...postFragment
  }
}
${postFrag}
${ownerFrag}
`;

export const users = `
query users {
  users: getUsers {
    ...ownerFragment
  }
}
${ownerFrag}
`;

export const reportings = `
query getReports {
  reportings: getReports {
     ...reportFragment
  }
}
${reportFrag}
`;

export const profile = `
query profile($data: ID!) {
  profile: getProfile(id: $data) {
    id
    numberFlags
    numberFollowers
    numberFollowing
    flags {
      ...flagFragment
    }
    followers{
       ...ownerFragment
    }
    ...ownerFragment
  }
}
${flagFrag}
${locationFrag}
${postFrag}
${ownerFrag}
`;

export const signIn = `
mutation login($data: SignInInput!) {
  signIn(input: $data) {
    user {
      ...userFragment
      email
      token
    }
  }
}
${userFrag}
`;

export const signUp = `
mutation register($data: SignUpInput!) {
  signUp(input: $data) {
    user {
      ...userFragment
      email
      token
    }
  }
}
${userFrag}
`;

export const signOut = `
mutation logout($data: LogoutInput!){
  logout(input: $data)
}
`;

export const follow = `
mutation follow($data: FollowInput!) {
  follow(input: $data)
}
`;

export const unFollow = `
mutation unfollow($data: UnfollowInput!) {
  unfollow(input: $data)
}
`;

export const createFlag = `
mutation createFlag($data: CreateFlagInput!) {
  createFlag(input: $data) {
    flag {
      id
    }
  }
}
`;

export const updateFlag = `
mutation updateFlag($data: UpdateFlagInput!) {
  updateFlag(input: $data) {
    flag {
      id
    }
  }
}
`;

export const destroyFlag = `
mutation destroyFlag($data: DestroyFlagInput!) {
  destroyFlag(input: $data) {
    flag {
      id
    }
  }
}
`;

export const createPost = `
mutation createPost($data: CreateInput!) {
  createPost(input: $data) {
    post {
      id
    }
  }
}
`;

export const updatePost = `
mutation updatePost($data: UpdatePostInput!) {
  updatePost(input: $data) {
    post {
     id
    }
  }
}
`;

export const destroyPost = `
mutation destroyPost($data: DestroyPostInput!) {
  destroyPost(input: $data) {
    post {
     id
    }
  }
}
`;

export const forgetPwd = `
mutation forgetPwd($data: SendResetPasswordInstructionsInput!) {
  sendResetPasswordInstructions(input: $data)
}
`;
export const resetPwd = `
mutation resetPwd($data: ResetPasswordInput!) {
  resetPassword(input: $data)
}`;

export const createReport = `
mutation createReport($data: CreateReportInput!) {
  createReport(input: $data) {
    report {
      ...reportFragment
    }
  }
}
${reportFrag}
`;

export const removePost = `
mutation removePost($data: RemovePostInput!) {
  removePost(input: $data) {
    report {
      ...reportFragment
    }
  }
}
${reportFrag}
`;

export const removeUser = `
mutation removeUser($data: BanUserInput!) {
  banUser(input: $data) {
     report {
      ...reportFragment
    }
  }
}
${reportFrag}
`;

export const closeReport = `
mutation closeReport($data: IgnoreAndCloseInput!) {
  ignoreAndClose(input: $data) {
     report {
      ...reportFragment
    }
  }
}
${reportFrag}
`;
