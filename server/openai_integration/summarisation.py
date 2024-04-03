function_description = [
    {
        "name": "generate_user_story",
        "description": "structure a user story with a role, action and benefit"
    }
]


def abstract_summary_extraction(client, transcription):
    response = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "You are a highly skilled AI trained in language comprehension and summarization. I would "
                           "like you to read the following text and summarize it into user stories to put into JIRA."
                           "It needs to have an id for each story starting from 1 and a title, description, "
                           "and acceptance criteria."
                           "Use the following text as an example: " + test_summary
            },
            {
                "role": "user",
                "content": transcription
            }
        ]
    )

    return response.choices[0].message.content


test_summary = """
        id: 
        Title: Implement Caching Mechanism for Improved Performance
        Description: As a developer, I want to implement a caching mechanism within our web application. This will allow us to reduce page load times and enhance the overall user experience.
        Acceptance Criteria:
        - When a user accesses a frequently requested page, the system should retrieve data from the cache rather than making a fresh database query.
        - Cache expiration should be configurable, allowing us to balance data freshness with performance gains.
        - Automated tests should verify that cached content remains consistent and up-to-date.
        id: 
        Title: Navigate to australia like a chicken nugget
        Description: As a chicken nugget, I want to navigate to Australia so that I can experience the land down under.
        Acceptance Criteria:
        - The chicken nugget must be able to travel across the ocean.
        - The chicken nugget must be able to survive the journey.
        - The chicken nugget must be able to explore various regions of Australia.
        id: 
        Title: Order a pizza online
        Description: As a pizza lover, I want to order a pizza online so that I can enjoy a delicious meal without leaving my home.
        Acceptance Criteria:
        - The online ordering system should allow me to choose from a variety of toppings and crust styles.
        - The system should provide an estimated delivery time based on my location.
        - I should receive a confirmation email with the order details after completing the purchase.
        """
