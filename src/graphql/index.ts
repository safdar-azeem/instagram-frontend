import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import type * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  Upload: any;
};

export type IAuthData = {
  token: Scalars['String'];
};

export type IComment = {
  _id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  likes: Array<Maybe<Scalars['ID']>>;
  post: IPost;
  user: IUser;
};

export type IGoogleAuthData = {
  isNewUser: Scalars['Boolean'];
  token: Scalars['String'];
};

export type IMutation = {
  bookmarkPost: Scalars['Boolean'];
  createComment: IComment;
  createPost: IPost;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  followOrUnfollowUser?: Maybe<Scalars['Boolean']>;
  googleLogin?: Maybe<IGoogleAuthData>;
  likeComment: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  login?: Maybe<IAuthData>;
  markAllNotificationsSeen: Scalars['Boolean'];
  register?: Maybe<IRegisterResponse>;
  updateProfile?: Maybe<Scalars['Boolean']>;
  uploadPhoto: Scalars['String'];
};


export type IMutationBookmarkPostArgs = {
  postId: Scalars['ID'];
};


export type IMutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['ID'];
};


export type IMutationCreatePostArgs = {
  content?: InputMaybe<Scalars['String']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  photo?: InputMaybe<Scalars['String']>;
};


export type IMutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type IMutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type IMutationFollowOrUnfollowUserArgs = {
  userId: Scalars['ID'];
};


export type IMutationGoogleLoginArgs = {
  token: Scalars['String'];
};


export type IMutationLikeCommentArgs = {
  commentId: Scalars['ID'];
};


export type IMutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type IMutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type IMutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type IMutationUpdateProfileArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profession?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};


export type IMutationUploadPhotoArgs = {
  file: Scalars['Upload'];
};

export type INotification = {
  _id: Scalars['ID'];
  createdAt: Scalars['Date'];
  isRemoved: Scalars['Boolean'];
  isSeen: Scalars['Boolean'];
  post?: Maybe<IPost>;
  receiver: IUser;
  sender: IUser;
  type: Scalars['String'];
};

export type IPost = {
  _id: Scalars['ID'];
  comments?: Maybe<Array<Maybe<Scalars['ID']>>>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  likes?: Maybe<Array<Maybe<Scalars['ID']>>>;
  photo?: Maybe<Scalars['String']>;
  user?: Maybe<IUser>;
};

export type IQuery = {
  countUnSeenNotifications: Scalars['Int'];
  explorePosts: Array<Maybe<IPost>>;
  getAllPosts: Array<Maybe<IPost>>;
  getBookmarkedPosts: Array<Maybe<IPost>>;
  getComments: Array<IComment>;
  getNotifications: Array<INotification>;
  getPostById: IPost;
  getPostsByUser: Array<Maybe<IPost>>;
  getUserById?: Maybe<IUser>;
  me?: Maybe<IUser>;
  searchUsersByName?: Maybe<Array<Maybe<IUser>>>;
};


export type IQueryExplorePostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type IQueryGetCommentsArgs = {
  comments: Array<Scalars['ID']>;
};


export type IQueryGetPostByIdArgs = {
  postId: Scalars['ID'];
};


export type IQueryGetPostsByUserArgs = {
  userId: Scalars['ID'];
};


export type IQueryGetUserByIdArgs = {
  id: Scalars['ID'];
};


export type IQuerySearchUsersByNameArgs = {
  name: Scalars['String'];
};

export type IRegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type IRegisterResponse = {
  message: Scalars['String'];
};

export type ISubscription = {
  newNotification: INotification;
};

export type IUser = {
  _id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  bookmarks?: Maybe<Array<Maybe<Scalars['ID']>>>;
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  followers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  following?: Maybe<Array<Maybe<Scalars['ID']>>>;
  isVerified?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  notifications?: Maybe<Array<Maybe<Scalars['ID']>>>;
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  profession?: Maybe<Scalars['String']>;
  totalMessages?: Maybe<Scalars['Int']>;
  totalNotifications?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};

export type ICommentFragment = { content: string, _id: string, createdAt: any, likes: Array<string | null>, post: { _id: string }, user: { _id: string, avatar?: string | null, name: string } };

export type INotificationFragment = { _id: string, type: string, createdAt: any, isSeen: boolean, isRemoved: boolean, post?: { _id: string, photo?: string | null } | null, sender: { _id: string, avatar?: string | null, name: string } };

export type IPostFragment = { _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null };

export type IUserFragment = { _id: string, name: string, avatar?: string | null, location?: string | null, website?: string | null, cover?: string | null, bio?: string | null, profession?: string | null, dateOfBirth?: any | null, createdAt?: any | null, followers?: Array<string | null> | null, following?: Array<string | null> | null, posts?: Array<string | null> | null, bookmarks?: Array<string | null> | null, totalNotifications?: number | null, totalMessages?: number | null, isVerified?: boolean | null };

export type IBookmarkPostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type IBookmarkPostMutationResult = { bookmarkPost: boolean };

export type ICreateCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['ID'];
}>;


export type ICreateCommentMutationResult = { createComment: { content: string, _id: string, createdAt: any, likes: Array<string | null>, post: { _id: string }, user: { _id: string, avatar?: string | null, name: string } } };

export type ICreatePostMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
}>;


export type ICreatePostMutationResult = { createPost: { _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } };

export type IDeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type IDeleteCommentMutationResult = { deleteComment: boolean };

export type IDeletePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type IDeletePostMutationResult = { deletePost: boolean };

export type IFollowOrUnfollowUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type IFollowOrUnfollowUserMutationResult = { followOrUnfollowUser?: boolean | null };

export type IGoogleLoginMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type IGoogleLoginMutationResult = { googleLogin?: { token: string, isNewUser: boolean } | null };

export type ILikeCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type ILikeCommentMutationResult = { likeComment: boolean };

export type ILikePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type ILikePostMutationResult = { likePost: boolean };

export type ILoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ILoginMutationResult = { login?: { token: string } | null };

export type IMarkAllNotificationsSeenMutationVariables = Exact<{ [key: string]: never; }>;


export type IMarkAllNotificationsSeenMutationResult = { markAllNotificationsSeen: boolean };

export type IRegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type IRegisterMutationResult = { register?: { message: string } | null };

export type IUpdateProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  profession?: InputMaybe<Scalars['String']>;
}>;


export type IUpdateProfileMutationResult = { updateProfile?: boolean | null };

export type IUploadPhotoMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type IUploadPhotoMutationResult = { uploadPhoto: string };

export type ISearchUsersByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ISearchUsersByNameQueryResult = { searchUsersByName?: Array<{ _id: string, avatar?: string | null, name: string } | null> | null };

export type ICountUnSeenNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ICountUnSeenNotificationsQueryResult = { countUnSeenNotifications: number };

export type IExplorePostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type IExplorePostsQueryResult = { explorePosts: Array<{ _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } | null> };

export type IGetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetAllPostsQueryResult = { getAllPosts: Array<{ _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } | null> };

export type IGetBookmarkedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetBookmarkedPostsQueryResult = { getBookmarkedPosts: Array<{ _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } | null> };

export type IGetCommentsQueryVariables = Exact<{
  comments: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type IGetCommentsQueryResult = { getComments: Array<{ content: string, _id: string, createdAt: any, likes: Array<string | null>, post: { _id: string }, user: { _id: string, avatar?: string | null, name: string } }> };

export type IGetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetNotificationsQueryResult = { getNotifications: Array<{ _id: string, type: string, createdAt: any, isSeen: boolean, isRemoved: boolean, post?: { _id: string, photo?: string | null } | null, sender: { _id: string, avatar?: string | null, name: string } }> };

export type IGetPostByIdQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type IGetPostByIdQueryResult = { getPostById: { _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } };

export type IGetUserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IGetUserByIdQueryResult = { getUserById?: { _id: string, name: string, avatar?: string | null, location?: string | null, website?: string | null, cover?: string | null, bio?: string | null, profession?: string | null, dateOfBirth?: any | null, createdAt?: any | null, followers?: Array<string | null> | null, following?: Array<string | null> | null, posts?: Array<string | null> | null, bookmarks?: Array<string | null> | null, totalNotifications?: number | null, totalMessages?: number | null, isVerified?: boolean | null } | null };

export type IGetPostsByUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type IGetPostsByUserQueryResult = { getPostsByUser: Array<{ _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } | null> };

export type IMeQueryVariables = Exact<{ [key: string]: never; }>;


export type IMeQueryResult = { me?: { _id: string, name: string, avatar?: string | null, location?: string | null, website?: string | null, cover?: string | null, bio?: string | null, profession?: string | null, dateOfBirth?: any | null, createdAt?: any | null, followers?: Array<string | null> | null, following?: Array<string | null> | null, posts?: Array<string | null> | null, bookmarks?: Array<string | null> | null, totalNotifications?: number | null, totalMessages?: number | null, isVerified?: boolean | null } | null };

export type INewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type INewNotificationSubscriptionResult = { newNotification: { _id: string, type: string, createdAt: any, isSeen: boolean, isRemoved: boolean, post?: { _id: string, photo?: string | null } | null, sender: { _id: string, avatar?: string | null, name: string } } };

export const CommentFragmentDoc = gql`
    fragment comment on Comment {
  content
  _id
  createdAt
  likes
  post {
    _id
  }
  user {
    _id
    avatar
    name
  }
}
    `;
export const NotificationFragmentDoc = gql`
    fragment notification on Notification {
  _id
  type
  createdAt
  isSeen
  isRemoved
  post {
    _id
    photo
  }
  sender {
    _id
    avatar
    name
  }
}
    `;
export const PostFragmentDoc = gql`
    fragment post on Post {
  _id
  content
  photo
  user {
    name
    _id
    avatar
  }
  createdAt
  likes
  comments
  isPublic
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  _id
  name
  avatar
  location
  website
  cover
  bio
  profession
  dateOfBirth
  createdAt
  followers
  following
  posts
  bookmarks
  totalNotifications
  totalMessages
  isVerified
}
    `;
export const BookmarkPostDocument = gql`
    mutation BookmarkPost($postId: ID!) {
  bookmarkPost(postId: $postId)
}
    `;

/**
 * __useBookmarkPostMutation__
 *
 * To run a mutation, you first call `useBookmarkPostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkPostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBookmarkPostMutation({
 *   variables: {
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useBookmarkPostMutation(options: VueApolloComposable.UseMutationOptions<IBookmarkPostMutationResult, IBookmarkPostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IBookmarkPostMutationResult, IBookmarkPostMutationVariables>>) {
  return VueApolloComposable.useMutation<IBookmarkPostMutationResult, IBookmarkPostMutationVariables>(BookmarkPostDocument, options);
}
export type BookmarkPostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IBookmarkPostMutationResult, IBookmarkPostMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($content: String!, $postId: ID!) {
  createComment(content: $content, postId: $postId) {
    ...comment
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateCommentMutation({
 *   variables: {
 *     content: // value for 'content'
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(options: VueApolloComposable.UseMutationOptions<ICreateCommentMutationResult, ICreateCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ICreateCommentMutationResult, ICreateCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<ICreateCommentMutationResult, ICreateCommentMutationVariables>(CreateCommentDocument, options);
}
export type CreateCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ICreateCommentMutationResult, ICreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($content: String, $photo: String, $isPublic: Boolean) {
  createPost(content: $content, photo: $photo, isPublic: $isPublic) {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreatePostMutation({
 *   variables: {
 *     content: // value for 'content'
 *     photo: // value for 'photo'
 *     isPublic: // value for 'isPublic'
 *   },
 * });
 */
export function useCreatePostMutation(options: VueApolloComposable.UseMutationOptions<ICreatePostMutationResult, ICreatePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ICreatePostMutationResult, ICreatePostMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ICreatePostMutationResult, ICreatePostMutationVariables>(CreatePostDocument, options);
}
export type CreatePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ICreatePostMutationResult, ICreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId)
}
    `;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteCommentMutation({
 *   variables: {
 *     commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(options: VueApolloComposable.UseMutationOptions<IDeleteCommentMutationResult, IDeleteCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IDeleteCommentMutationResult, IDeleteCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<IDeleteCommentMutationResult, IDeleteCommentMutationVariables>(DeleteCommentDocument, options);
}
export type DeleteCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IDeleteCommentMutationResult, IDeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}
    `;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePostMutation({
 *   variables: {
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(options: VueApolloComposable.UseMutationOptions<IDeletePostMutationResult, IDeletePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IDeletePostMutationResult, IDeletePostMutationVariables>>) {
  return VueApolloComposable.useMutation<IDeletePostMutationResult, IDeletePostMutationVariables>(DeletePostDocument, options);
}
export type DeletePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IDeletePostMutationResult, IDeletePostMutationVariables>;
export const FollowOrUnfollowUserDocument = gql`
    mutation FollowOrUnfollowUser($userId: ID!) {
  followOrUnfollowUser(userId: $userId)
}
    `;

/**
 * __useFollowOrUnfollowUserMutation__
 *
 * To run a mutation, you first call `useFollowOrUnfollowUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useFollowOrUnfollowUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useFollowOrUnfollowUserMutation({
 *   variables: {
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowOrUnfollowUserMutation(options: VueApolloComposable.UseMutationOptions<IFollowOrUnfollowUserMutationResult, IFollowOrUnfollowUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IFollowOrUnfollowUserMutationResult, IFollowOrUnfollowUserMutationVariables>>) {
  return VueApolloComposable.useMutation<IFollowOrUnfollowUserMutationResult, IFollowOrUnfollowUserMutationVariables>(FollowOrUnfollowUserDocument, options);
}
export type FollowOrUnfollowUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IFollowOrUnfollowUserMutationResult, IFollowOrUnfollowUserMutationVariables>;
export const GoogleLoginDocument = gql`
    mutation GoogleLogin($token: String!) {
  googleLogin(token: $token) {
    token
    isNewUser
  }
}
    `;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useGoogleLoginMutation({
 *   variables: {
 *     token: // value for 'token'
 *   },
 * });
 */
export function useGoogleLoginMutation(options: VueApolloComposable.UseMutationOptions<IGoogleLoginMutationResult, IGoogleLoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IGoogleLoginMutationResult, IGoogleLoginMutationVariables>>) {
  return VueApolloComposable.useMutation<IGoogleLoginMutationResult, IGoogleLoginMutationVariables>(GoogleLoginDocument, options);
}
export type GoogleLoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IGoogleLoginMutationResult, IGoogleLoginMutationVariables>;
export const LikeCommentDocument = gql`
    mutation LikeComment($commentId: ID!) {
  likeComment(commentId: $commentId)
}
    `;

/**
 * __useLikeCommentMutation__
 *
 * To run a mutation, you first call `useLikeCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLikeCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLikeCommentMutation({
 *   variables: {
 *     commentId: // value for 'commentId'
 *   },
 * });
 */
export function useLikeCommentMutation(options: VueApolloComposable.UseMutationOptions<ILikeCommentMutationResult, ILikeCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ILikeCommentMutationResult, ILikeCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<ILikeCommentMutationResult, ILikeCommentMutationVariables>(LikeCommentDocument, options);
}
export type LikeCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ILikeCommentMutationResult, ILikeCommentMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: ID!) {
  likePost(postId: $postId)
}
    `;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLikePostMutation({
 *   variables: {
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(options: VueApolloComposable.UseMutationOptions<ILikePostMutationResult, ILikePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ILikePostMutationResult, ILikePostMutationVariables>>) {
  return VueApolloComposable.useMutation<ILikePostMutationResult, ILikePostMutationVariables>(LikePostDocument, options);
}
export type LikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ILikePostMutationResult, ILikePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<ILoginMutationResult, ILoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ILoginMutationResult, ILoginMutationVariables>>) {
  return VueApolloComposable.useMutation<ILoginMutationResult, ILoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ILoginMutationResult, ILoginMutationVariables>;
export const MarkAllNotificationsSeenDocument = gql`
    mutation MarkAllNotificationsSeen {
  markAllNotificationsSeen
}
    `;

/**
 * __useMarkAllNotificationsSeenMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsSeenMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsSeenMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useMarkAllNotificationsSeenMutation();
 */
export function useMarkAllNotificationsSeenMutation(options: VueApolloComposable.UseMutationOptions<IMarkAllNotificationsSeenMutationResult, IMarkAllNotificationsSeenMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IMarkAllNotificationsSeenMutationResult, IMarkAllNotificationsSeenMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<IMarkAllNotificationsSeenMutationResult, IMarkAllNotificationsSeenMutationVariables>(MarkAllNotificationsSeenDocument, options);
}
export type MarkAllNotificationsSeenMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IMarkAllNotificationsSeenMutationResult, IMarkAllNotificationsSeenMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    message
  }
}
    `;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     name: // value for 'name'
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<IRegisterMutationResult, IRegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IRegisterMutationResult, IRegisterMutationVariables>>) {
  return VueApolloComposable.useMutation<IRegisterMutationResult, IRegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IRegisterMutationResult, IRegisterMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($name: String, $bio: String, $avatar: String, $location: String, $website: String, $cover: String, $dateOfBirth: String, $profession: String) {
  updateProfile(
    name: $name
    bio: $bio
    avatar: $avatar
    location: $location
    website: $website
    cover: $cover
    dateOfBirth: $dateOfBirth
    profession: $profession
  )
}
    `;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateProfileMutation({
 *   variables: {
 *     name: // value for 'name'
 *     bio: // value for 'bio'
 *     avatar: // value for 'avatar'
 *     location: // value for 'location'
 *     website: // value for 'website'
 *     cover: // value for 'cover'
 *     dateOfBirth: // value for 'dateOfBirth'
 *     profession: // value for 'profession'
 *   },
 * });
 */
export function useUpdateProfileMutation(options: VueApolloComposable.UseMutationOptions<IUpdateProfileMutationResult, IUpdateProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IUpdateProfileMutationResult, IUpdateProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<IUpdateProfileMutationResult, IUpdateProfileMutationVariables>(UpdateProfileDocument, options);
}
export type UpdateProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IUpdateProfileMutationResult, IUpdateProfileMutationVariables>;
export const UploadPhotoDocument = gql`
    mutation UploadPhoto($file: Upload!) {
  uploadPhoto(file: $file)
}
    `;

/**
 * __useUploadPhotoMutation__
 *
 * To run a mutation, you first call `useUploadPhotoMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUploadPhotoMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUploadPhotoMutation({
 *   variables: {
 *     file: // value for 'file'
 *   },
 * });
 */
export function useUploadPhotoMutation(options: VueApolloComposable.UseMutationOptions<IUploadPhotoMutationResult, IUploadPhotoMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IUploadPhotoMutationResult, IUploadPhotoMutationVariables>>) {
  return VueApolloComposable.useMutation<IUploadPhotoMutationResult, IUploadPhotoMutationVariables>(UploadPhotoDocument, options);
}
export type UploadPhotoMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IUploadPhotoMutationResult, IUploadPhotoMutationVariables>;
export const SearchUsersByNameDocument = gql`
    query SearchUsersByName($name: String!) {
  searchUsersByName(name: $name) {
    _id
    avatar
    name
  }
}
    `;

/**
 * __useSearchUsersByNameQuery__
 *
 * To run a query within a Vue component, call `useSearchUsersByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersByNameQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSearchUsersByNameQuery({
 *   name: // value for 'name'
 * });
 */
export function useSearchUsersByNameQuery(variables: ISearchUsersByNameQueryVariables | VueCompositionApi.Ref<ISearchUsersByNameQueryVariables> | ReactiveFunction<ISearchUsersByNameQueryVariables>, options: VueApolloComposable.UseQueryOptions<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables>(SearchUsersByNameDocument, variables, options);
}
export function useSearchUsersByNameLazyQuery(variables: ISearchUsersByNameQueryVariables | VueCompositionApi.Ref<ISearchUsersByNameQueryVariables> | ReactiveFunction<ISearchUsersByNameQueryVariables>, options: VueApolloComposable.UseQueryOptions<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables>(SearchUsersByNameDocument, variables, options);
}
export type SearchUsersByNameQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ISearchUsersByNameQueryResult, ISearchUsersByNameQueryVariables>;
export const CountUnSeenNotificationsDocument = gql`
    query CountUnSeenNotifications {
  countUnSeenNotifications
}
    `;

/**
 * __useCountUnSeenNotificationsQuery__
 *
 * To run a query within a Vue component, call `useCountUnSeenNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountUnSeenNotificationsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCountUnSeenNotificationsQuery();
 */
export function useCountUnSeenNotificationsQuery(options: VueApolloComposable.UseQueryOptions<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables>(CountUnSeenNotificationsDocument, {}, options);
}
export function useCountUnSeenNotificationsLazyQuery(options: VueApolloComposable.UseQueryOptions<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables>(CountUnSeenNotificationsDocument, {}, options);
}
export type CountUnSeenNotificationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ICountUnSeenNotificationsQueryResult, ICountUnSeenNotificationsQueryVariables>;
export const ExplorePostsDocument = gql`
    query ExplorePosts($limit: Int) {
  explorePosts(limit: $limit) {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useExplorePostsQuery__
 *
 * To run a query within a Vue component, call `useExplorePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExplorePostsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useExplorePostsQuery({
 *   limit: // value for 'limit'
 * });
 */
export function useExplorePostsQuery(variables: IExplorePostsQueryVariables | VueCompositionApi.Ref<IExplorePostsQueryVariables> | ReactiveFunction<IExplorePostsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<IExplorePostsQueryResult, IExplorePostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IExplorePostsQueryResult, IExplorePostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IExplorePostsQueryResult, IExplorePostsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IExplorePostsQueryResult, IExplorePostsQueryVariables>(ExplorePostsDocument, variables, options);
}
export function useExplorePostsLazyQuery(variables: IExplorePostsQueryVariables | VueCompositionApi.Ref<IExplorePostsQueryVariables> | ReactiveFunction<IExplorePostsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<IExplorePostsQueryResult, IExplorePostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IExplorePostsQueryResult, IExplorePostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IExplorePostsQueryResult, IExplorePostsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IExplorePostsQueryResult, IExplorePostsQueryVariables>(ExplorePostsDocument, variables, options);
}
export type ExplorePostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IExplorePostsQueryResult, IExplorePostsQueryVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts {
  getAllPosts {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a Vue component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllPostsQuery();
 */
export function useGetAllPostsQuery(options: VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>(GetAllPostsDocument, {}, options);
}
export function useGetAllPostsLazyQuery(options: VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>(GetAllPostsDocument, {}, options);
}
export type GetAllPostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>;
export const GetBookmarkedPostsDocument = gql`
    query GetBookmarkedPosts {
  getBookmarkedPosts {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetBookmarkedPostsQuery__
 *
 * To run a query within a Vue component, call `useGetBookmarkedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarkedPostsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetBookmarkedPostsQuery();
 */
export function useGetBookmarkedPostsQuery(options: VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>(GetBookmarkedPostsDocument, {}, options);
}
export function useGetBookmarkedPostsLazyQuery(options: VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>(GetBookmarkedPostsDocument, {}, options);
}
export type GetBookmarkedPostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>;
export const GetCommentsDocument = gql`
    query GetComments($comments: [ID!]!) {
  getComments(comments: $comments) {
    ...comment
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a Vue component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCommentsQuery({
 *   comments: // value for 'comments'
 * });
 */
export function useGetCommentsQuery(variables: IGetCommentsQueryVariables | VueCompositionApi.Ref<IGetCommentsQueryVariables> | ReactiveFunction<IGetCommentsQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetCommentsQueryResult, IGetCommentsQueryVariables>(GetCommentsDocument, variables, options);
}
export function useGetCommentsLazyQuery(variables: IGetCommentsQueryVariables | VueCompositionApi.Ref<IGetCommentsQueryVariables> | ReactiveFunction<IGetCommentsQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetCommentsQueryResult, IGetCommentsQueryVariables>(GetCommentsDocument, variables, options);
}
export type GetCommentsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetCommentsQueryResult, IGetCommentsQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications {
  getNotifications {
    ...notification
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a Vue component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetNotificationsQuery();
 */
export function useGetNotificationsQuery(options: VueApolloComposable.UseQueryOptions<IGetNotificationsQueryResult, IGetNotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetNotificationsQueryResult, IGetNotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetNotificationsQueryResult, IGetNotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetNotificationsQueryResult, IGetNotificationsQueryVariables>(GetNotificationsDocument, {}, options);
}
export function useGetNotificationsLazyQuery(options: VueApolloComposable.UseQueryOptions<IGetNotificationsQueryResult, IGetNotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetNotificationsQueryResult, IGetNotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetNotificationsQueryResult, IGetNotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetNotificationsQueryResult, IGetNotificationsQueryVariables>(GetNotificationsDocument, {}, options);
}
export type GetNotificationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetNotificationsQueryResult, IGetNotificationsQueryVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($postId: ID!) {
  getPostById(postId: $postId) {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a Vue component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPostByIdQuery({
 *   postId: // value for 'postId'
 * });
 */
export function useGetPostByIdQuery(variables: IGetPostByIdQueryVariables | VueCompositionApi.Ref<IGetPostByIdQueryVariables> | ReactiveFunction<IGetPostByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetPostByIdQueryResult, IGetPostByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetPostByIdQueryResult, IGetPostByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetPostByIdQueryResult, IGetPostByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetPostByIdQueryResult, IGetPostByIdQueryVariables>(GetPostByIdDocument, variables, options);
}
export function useGetPostByIdLazyQuery(variables: IGetPostByIdQueryVariables | VueCompositionApi.Ref<IGetPostByIdQueryVariables> | ReactiveFunction<IGetPostByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetPostByIdQueryResult, IGetPostByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetPostByIdQueryResult, IGetPostByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetPostByIdQueryResult, IGetPostByIdQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetPostByIdQueryResult, IGetPostByIdQueryVariables>(GetPostByIdDocument, variables, options);
}
export type GetPostByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetPostByIdQueryResult, IGetPostByIdQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  getUserById(id: $id) {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a Vue component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUserByIdQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetUserByIdQuery(variables: IGetUserByIdQueryVariables | VueCompositionApi.Ref<IGetUserByIdQueryVariables> | ReactiveFunction<IGetUserByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>(GetUserByIdDocument, variables, options);
}
export function useGetUserByIdLazyQuery(variables: IGetUserByIdQueryVariables | VueCompositionApi.Ref<IGetUserByIdQueryVariables> | ReactiveFunction<IGetUserByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>(GetUserByIdDocument, variables, options);
}
export type GetUserByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>;
export const GetPostsByUserDocument = gql`
    query GetPostsByUser($userId: ID!) {
  getPostsByUser(userId: $userId) {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostsByUserQuery__
 *
 * To run a query within a Vue component, call `useGetPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPostsByUserQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useGetPostsByUserQuery(variables: IGetPostsByUserQueryVariables | VueCompositionApi.Ref<IGetPostsByUserQueryVariables> | ReactiveFunction<IGetPostsByUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>(GetPostsByUserDocument, variables, options);
}
export function useGetPostsByUserLazyQuery(variables: IGetPostsByUserQueryVariables | VueCompositionApi.Ref<IGetPostsByUserQueryVariables> | ReactiveFunction<IGetPostsByUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>(GetPostsByUserDocument, variables, options);
}
export type GetPostsByUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IMeQueryResult, IMeQueryVariables>(MeDocument, {}, options);
}
export function useMeLazyQuery(options: VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IMeQueryResult, IMeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IMeQueryResult, IMeQueryVariables>;
export const NewNotificationDocument = gql`
    subscription NewNotification {
  newNotification {
    ...notification
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useNewNotificationSubscription__
 *
 * To run a query within a Vue component, call `useNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useNewNotificationSubscription();
 */
export function useNewNotificationSubscription(options: VueApolloComposable.UseSubscriptionOptions<INewNotificationSubscriptionResult, INewNotificationSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<INewNotificationSubscriptionResult, INewNotificationSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<INewNotificationSubscriptionResult, INewNotificationSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<INewNotificationSubscriptionResult, INewNotificationSubscriptionVariables>(NewNotificationDocument, {}, options);
}
export type NewNotificationSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<INewNotificationSubscriptionResult, INewNotificationSubscriptionVariables>;