import { baseApi } from "./baseApi";

// Message Types
interface Message {
  id: number;
  ride_id: number;
  sender_id: number;
  content: string;
  message_type: "group" | "private";
  created_at: string;
}

interface GroupMessagePayload {
  ride_id: number;
  content: string;
}

interface PrivateMessagePayload {
  receiver_id: number;
  ride_id: number;
  content: string;
}

// Redux Toolkit Query API via baseApi
export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Chat History - Method: GET, Endpoint: /chat/history/{ride_id}
    getChatHistory: builder.query<Message[], number>({
      query: (rideId) => `/chat/history/${rideId}`,
      providesTags: (result, error, rideId) => [{ type: "Chat", id: rideId }],
    }),

    // Send Group Message - Event: send_ride_message
    sendGroupMessage: builder.mutation<void, GroupMessagePayload>({
      query: (payload) => ({
        url: "/chat/message",
        method: "POST",
        body: { ...payload, message_type: "group" },
      }),
      invalidatesTags: (result, error, { ride_id }) => [
        { type: "Chat", id: ride_id },
      ],
    }),

    // Send Private Message / DM - Event: send_direct_message
    sendPrivateMessage: builder.mutation<void, PrivateMessagePayload>({
      query: (payload) => ({
        url: "/chat/direct-message",
        method: "POST",
        body: { ...payload, message_type: "private" },
      }),
      invalidatesTags: (result, error, { ride_id }) => [
        { type: "Chat", id: ride_id },
      ],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useGetChatHistoryQuery,
  useSendGroupMessageMutation,
  useSendPrivateMessageMutation,
} = messageApi;
