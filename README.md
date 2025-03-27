# LINE Bot with OpenAI Integration

This project is a side project that integrates a LINE Bot with OpenAI's GPT model to create an intelligent conversational assistant. The bot is designed to provide helpful and friendly responses to user messages, making it suitable for various use cases such as customer support, personal assistance, or entertainment.

## Features

- **LINE Bot Integration**: The bot is connected to the LINE Messaging API to handle user messages and send replies.
- **OpenAI GPT Model**: Utilizes OpenAI's GPT model to generate intelligent and context-aware responses.
- **Conversation History**: Maintains a short conversation history to provide context for better responses.
- **Customizable Settings**: Easily adjust parameters like response randomness (temperature) and conversation history length.

## Prerequisites

- Node.js installed on your system.
- A LINE Developer account with a Messaging API channel.
- An OpenAI API key.

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
   LINE_CHANNEL_SECRET=your_line_channel_secret
   PORT=8080
   ```

## Usage

1. Start the server:
   ```bash
   node index.js
   ```

2. Set up the LINE webhook URL to point to your server's endpoint (e.g., `https://your-domain.com/webhook`).

3. Interact with the bot through your LINE app.

## Configuration

- **Temperature**: Adjust the `temperature` parameter in the OpenAI API call to control the randomness of responses.
- **Conversation History Length**: Modify the logic to keep more or fewer messages in the `conversationHistory` array.

## Project Structure

- `index.js`: Main application file containing the server and bot logic.
- `package.json`: Project dependencies and scripts.

## License

This project is licensed under the MIT License. Feel free to use and modify it for your own purposes.

## Acknowledgments

- [LINE Messaging API](https://developers.line.biz/en/services/messaging-api/)
- [OpenAI API](https://platform.openai.com/docs/)