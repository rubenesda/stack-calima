import { GraphQLResolveInfo } from 'graphql';
import { IFavoriteModel } from './models';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateFavoriteResponse = {
  __typename?: 'CreateFavoriteResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** New create Favorite after a successful mutation */
  favorite?: Maybe<Favorite>;
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

export type DeleteFavoriteResponse = {
  __typename?: 'DeleteFavoriteResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

/** Favorite is an element that link a product store item as favorite */
export type Favorite = {
  __typename?: 'Favorite';
  id: Scalars['ID']['output'];
  /** The Product's ID */
  productId: Scalars['String']['output'];
  /** The User's identifier */
  user: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Update a specific favorite product */
  createFavorite: CreateFavoriteResponse;
  /** Delete a specfiic favorite product */
  deleteFavorite: DeleteFavoriteResponse;
};


export type MutationCreateFavoriteArgs = {
  createFavoriteInput: CreateFavoriteInput;
};


export type MutationDeleteFavoriteArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Get favorites array for favorites list page */
  favorites: Array<Favorite>;
};


export type QueryFavoritesArgs = {
  user: Scalars['String']['input'];
};

/** Favorite's data that will be stored */
export type CreateFavoriteInput = {
  /** The Product's ID */
  productId: Scalars['String']['input'];
  /** The User's identifier */
  user: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateFavoriteResponse: ResolverTypeWrapper<Omit<CreateFavoriteResponse, 'favorite'> & { favorite?: Maybe<ResolversTypes['Favorite']> }>;
  DeleteFavoriteResponse: ResolverTypeWrapper<DeleteFavoriteResponse>;
  Favorite: ResolverTypeWrapper<IFavoriteModel>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  createFavoriteInput: CreateFavoriteInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateFavoriteResponse: Omit<CreateFavoriteResponse, 'favorite'> & { favorite?: Maybe<ResolversParentTypes['Favorite']> };
  DeleteFavoriteResponse: DeleteFavoriteResponse;
  Favorite: IFavoriteModel;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  createFavoriteInput: CreateFavoriteInput;
};

export type CreateFavoriteResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CreateFavoriteResponse'] = ResolversParentTypes['CreateFavoriteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  favorite?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFavoriteResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['DeleteFavoriteResponse'] = ResolversParentTypes['DeleteFavoriteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFavorite?: Resolver<ResolversTypes['CreateFavoriteResponse'], ParentType, ContextType, RequireFields<MutationCreateFavoriteArgs, 'createFavoriteInput'>>;
  deleteFavorite?: Resolver<ResolversTypes['DeleteFavoriteResponse'], ParentType, ContextType, RequireFields<MutationDeleteFavoriteArgs, 'id'>>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  favorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType, RequireFields<QueryFavoritesArgs, 'user'>>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  CreateFavoriteResponse?: CreateFavoriteResponseResolvers<ContextType>;
  DeleteFavoriteResponse?: DeleteFavoriteResponseResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

