import streamlit as st
from langchain_core.messages import AIMessage, HumanMessage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate

load_dotenv()

# API config
st.set_page_config(page_title='MEDICAL DIAGNOSIS USING IMAGE', page_icon='⚕️')
st.title('Hospital Management System IA for more information about diagnostics')

def get_response(user_query, chat_history):
    template = """
    You are a helpful assistant. Answer the following questions taking into consideration
    the history of the conversation.

    Chat history:
    {chat_history}

    User question:
    {user_question}
    """
    # Convert chat history to a text format
    chat_history_text = "\n".join([f"{'Human' if isinstance(msg, HumanMessage) else 'AI'}: {msg.content}" for msg in chat_history])

    prompt = ChatPromptTemplate.from_template(template)
    formatted_prompt = prompt.format(chat_history=chat_history_text, user_question=user_query)
    llm = ChatOpenAI()

    # Use the `invoke` method instead of `__call__`
    response = llm.invoke(formatted_prompt)

    # Check the type of response and convert it to a string if necessary
    if not isinstance(response, str):
        response = str(response)

    # Clean up the response if necessary
    response = response.replace("content='AI:", "").replace("AI response:\n", "").strip()

    return response

# Session state
if "chat_history" not in st.session_state:
    st.session_state.chat_history = [
        AIMessage(content="Hi, I am a Medical Assistant Bot. How can I help you today?")
    ]

# Conversation
for message in st.session_state.chat_history:
    if isinstance(message, AIMessage):
        with st.chat_message("AI"):
            st.write(message.content)
    elif isinstance(message, HumanMessage):
        with st.chat_message("Human"):
            st.write(message.content)

# Get user input
user_query = st.chat_input("Please ask your question ...")
if user_query is not None and user_query != "":
    st.session_state.chat_history.append(HumanMessage(content=user_query))

    with st.chat_message("Human"):
        st.markdown(user_query)
    with st.chat_message("AI"):
        response = get_response(user_query, st.session_state.chat_history)
        st.write(response)

    st.session_state.chat_history.append(AIMessage(content=response))
