import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import Cookies from 'js-cookie';

/** graphql http link */
const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_SERVER_URI,
});

/** graphql auth middleware */
const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			accesstoken: Cookies.get('access_token'),
			refreshtoken: Cookies.get('refresh_token'),
		},
	});
	return forward(operation);
});

/** graphql client */
export const graphqlClient = new ApolloClient({
	link: authMiddleware.concat(httpLink),
	cache: new InMemoryCache(),
});
