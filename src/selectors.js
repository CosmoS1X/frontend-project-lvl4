export const getAllChannels = ({ channelsState }) => channelsState.channels;

export const getAllMessages = ({ messagesState }) => messagesState.messages;

export const getCurrentChannelId = ({ channelsState }) => channelsState.currentChannelId;

export const getMessagesCountForCurrentChannel = ({ messagesState, channelsState }) => (
  messagesState.messages
    .filter(({ channelId }) => channelId === channelsState.currentChannelId).length
);

export const getModalState = ({ modalState }) => modalState;
