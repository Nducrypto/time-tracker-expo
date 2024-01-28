import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStateContext } from "../../../utils/ContextProvider";

const MessageComponent = () => {
  const { displayedText } = useStateContext();
  const lowercaseText = displayedText.toLowerCase().replace(/\s/g, "");

  const messageToDisplay = {
    worktime: `🎉 Congratulations! Your Work session is complete! 🎉 Take a moment to celebrate your accomplishments! If you're ready to continue, Click the Snooze button to extend your Work session time Give yourself a little extra time if needed. 🚀 Click the Proceed button to move on to the next session. Get ready to dive back into your tasks and stay productive! Remember, taking breaks is essential for maintaining focus and productivity! 💪`,
    breaktime: `⏰ Break's over! Time to get back to work! ⏰ Hope you enjoyed your break! Now, it's time to refocus and dive back into your tasks. Click the Snooze button if you need a little more time before starting your next work session. 🚀 Click the Proceed button to start your next work session. Remember, striking the right balance between work and breaks is key to productivity! 💪
`,
  };
  return (
    <View>
      <Text>{messageToDisplay[lowercaseText]}</Text>
    </View>
  );
};

export default MessageComponent;
