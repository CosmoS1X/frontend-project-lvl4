export const getAllChannels = ({ channelsState }) => channelsState.channels;

export const getAllMessages = ({ messagesState }) => messagesState.messages;

export const getCurrentChannel = ({ channelsState }) => (
  channelsState.channels.find(({ id }) => id === channelsState.currentChannelId)
);

export const getCurrentChannelName = ({ channelsState }) => (
  channelsState.channels.find(({ id }) => id === channelsState.currentChannelId)?.name
);

export const getCurrentChannelId = ({ channelsState }) => channelsState.currentChannelId;

export const getMessagesforCurrentChannel = ({ messagesState, channelsState }) => (
  messagesState.messages
    .filter(({ channelId }) => channelId === channelsState.currentChannelId)
);

export const getMessagesCountForCurrentChannel = ({ messagesState, channelsState }) => (
  messagesState.messages
    .filter(({ channelId }) => channelId === channelsState.currentChannelId).length
);

export const getModalState = ({ modalState }) => modalState;
