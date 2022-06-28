import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

def hard_skills(d):
    p = """Name the top three skills a {position} must have.""".format(**d)
    r = openai.Completion.create(
      engine="text-curie-001",
      prompt=p,
      temperature=0.0,
      max_tokens=1500
    )
    theSkill = r.choices[0].text
    p = """Write a persuasive and detailed paragraph on how {name} uses {skill} to be a highly effective {position}. """.format(**d,skill=theSkill)
    r = openai.Completion.create(
      engine="text-curie-001",
      prompt=p,
      temperature=0.0,
      max_tokens=1500
    )
    return r.choices[0].text

def soft_skills(d):
    # build skills. obtain them in a predictable format for easy parsing
    p = """Q: Name three essential soft skills a Software Engineer must have.
A: 
organization and timekeeping to keep large projects on track, 
a collaborative disposition to build software in a team,
clear technical writing to produce high-quality documentation

Q: Name three essential soft skills a {position} must have

A:
""".format(**d)
    # build the request. note that a repeat penalty is set
    r = openai.Completion.create(
      model="text-curie-001",
      max_tokens=1024,
      prompt=p,
      presence_penalty=2,
      temperature=0.0
    )
    RL = [] # response list
    theSkills = r["choices"][0].text.split(",")
    for skill in theSkills :
        p  = """Write a paragraph on how {name} uses {skill} as a {position}.""".format(**d,skill=skill)
        r = openai.Completion.create(
          model="text-curie-001",
          max_tokens=1024,
          prompt=p,
          temperature=0.5
        )
        RL.append(r)
    # combine responses in response list into a single paragraph
    p = " ".join([r.choices[0].text.rstrip().lstrip() for r in RL])
    return p
