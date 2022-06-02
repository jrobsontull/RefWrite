import openai
import pickle

"""
NEED TO REPLACE THIS KEY FOR PRODUCTION
"""
openai.api_key="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"

"""
d: dictionary with keys:
position
"""
def skill_prompt(d):
    return """Name the top three skills a {position} must have.""".format(**d)

"""
d: dictionary with keys
name, skill, position
"""
def paragraph_prompt(d) :
    return """Write a persuasive and detailed paragraph on how {name} uses {skill} to be a highly effective {position}. """.format(**d)

def send_prompt(thePrompt,theEngine="text-curie-001") :
    response = openai.Completion.create(
      engine=theEngine,
      prompt=thePrompt,
      temperature=0.0,
      max_tokens=1500
    )
    return response

def send_save(prompt,filename) :
    response = send_prompt(prompt)
    with open(filename, 'wb') as f :
        pickle.dump(response,f,pickle.HIGHEST_PROTOCOL)
    return response