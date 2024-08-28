import streamlit as st
from langchain_core.messages import AIMessage, HumanMessage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
import os
import time

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY1")

bot_logo = "./chatbotImages/b1.webp"
human_logo = "./chatbotImages/p1.webp"

st.set_page_config(page_title='Hospital Management System AI', page_icon='⚕️')
st.title('Hospital Management System AI for more information about diagnostics')

def get_response(user_query, chat_history):
    template = """
    You are a helpful assistant. Answer the following questions taking into consideration
    the history of the conversation.

    Chat history:
    {chat_history}

    User question:
    {user_question}
    """
    chat_history_text = "\n".join([f"{'Human' if isinstance(msg, HumanMessage) else 'AI'}: {msg.content}" for msg in chat_history])

    prompt = ChatPromptTemplate.from_template(template)
    formatted_prompt = prompt.format(chat_history=chat_history_text, user_question=user_query)
    llm = ChatOpenAI(openai_api_key=api_key)

    response = llm(formatted_prompt).content

    if not isinstance(response, str):
        response = str(response)

    return response

def type_out_response(response_text):
    full_text = ""
    placeholder = st.empty()
    for word in response_text.split():
        full_text += word + " "
        placeholder.markdown(full_text)
        time.sleep(0.1)

# Session state
if "chat_history" not in st.session_state:
    st.session_state.chat_history = [
        AIMessage(content="Hi, I am a Medical Assistant. How can I help you today?")
    ]

# Conversation
for message in st.session_state.chat_history:
    if isinstance(message, AIMessage):
        with st.chat_message("AI"):
            st.image(bot_logo, width=50)
            st.write(message.content)
    elif isinstance(message, HumanMessage):
        with st.chat_message("Human"):
            st.image(human_logo, width=50)
            st.write(message.content)

# Get user input
user_query = st.chat_input("Please ask your question ...")
if user_query is not None and user_query != "":
    st.session_state.chat_history.append(HumanMessage(content=user_query))

    with st.chat_message("Human"):
        st.image(human_logo, width=50)
        st.write(user_query)
    with st.chat_message("AI"):
        response = get_response(user_query, st.session_state.chat_history)
        st.image(bot_logo, width=50)
        type_out_response(response)

    st.session_state.chat_history.append(AIMessage(content=response))
