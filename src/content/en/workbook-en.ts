// Overlay en inglés del workbook (src/content/workbook.ts), que genera scripts/gen-workbook.py desde el libro y no se edita a mano.
// Una entrada por id de plantilla y, dentro, solo los campos con texto. Lo que falte se muestra en español
// (el español prevalece). La prueba scripts/test-overlay-en.mjs lista las entradas y los campos que faltan.
// Glosario: docs/terminos.txt, sección «English». Las cifras van en formato inglés (USD 61,600; 7.0; 25%).
// Las claves de `options` y de `valores` son los valores en español que leen las fórmulas: no se traducen.
// Si el libro cambia y se regenera workbook.ts, corre npm run test:overlay -- --strict para ver qué textos revisar.

import type { PlantillaEn } from "../workbook-i18n";

/** Nombres de las partes, por número («01»). */
export const PARTES_EN: Record<string, string> = {
  "01": "Diagnosis",
  "02": "Market",
  "03": "Offer",
  "04": "First clients",
  "05": "Transition"
};

export const WORKBOOK_EN: Record<string, PlantillaEn> = {
  "k1": {
    "title": "Your runway today",
    "time": "20 minutes",
    "purpose": "Know how many months you can last without a salary.",
    "intro": "Use rough numbers. Chapter 1 takes them into three scenarios and chapter 2 refines your cost of living.",
    "trae": "Bring your bank statements from the last three months.",
    "where": "“Exit plan” kit, before Part 01",
    "level": "Level 0",
    "who": "Carmen and Javier",
    "check": [
      "You have your runway to one decimal place."
    ],
    "calc": {
      "A": {
        "label": "Liquid savings"
      },
      "B": {
        "label": "Monthly cost of living"
      },
      "runway": {
        "label": "Runway",
        "unit": "months",
        "show": "A ÷ B"
      }
    },
    "avisos": [
      "Your runway is below the method's 6-month minimum."
    ]
  },
  "k2": {
    "title": "What your contract says",
    "time": "30 minutes",
    "purpose": "Know what you can do outside your job.",
    "intro": "Find your contract, your company's internal work rules, its code of ethics and its conflict of interest policy. Write down what you find in each row.",
    "trae": "Bring your contract and your company's code of ethics.",
    "where": "“Exit plan” kit, before Part 01",
    "level": "Level 0",
    "who": "Carmen",
    "check": [
      "Every row has an answer or a question for your lawyer."
    ]
  },
  "k3": {
    "title": "Your exit in numbers",
    "time": "20 minutes",
    "purpose": "Estimate your severance before you negotiate or sign.",
    "intro": "This template estimates what you would receive if your employer ends your contract without cause. If you've already left, use it to review your final settlement before you sign it.",
    "trae": "Bring your contract and, if you've already left, your final settlement.",
    "where": "“Exit plan” kit, before Part 01",
    "level": "Level 0",
    "who": "Javier",
    "check": [
      "You know what you would be owed and how it differs from what you're offered."
    ]
  },
  "k4": {
    "title": "Your first 30 days",
    "time": "30 minutes",
    "purpose": "Have each week decided in case you leave.",
    "intro": "Fill it in even if you have a job. If you ever need it, you'll have made the decisions calmly. Write your own version of each week. The phrases in gray are the book's guide.",
    "trae": "Bring K.1 and K.3.",
    "where": "“Exit plan” kit, before Part 01",
    "level": "Level 0",
    "who": "Javier",
    "check": [
      "Every week has at least one decision of yours in writing."
    ]
  },
  "k5": {
    "title": "Your first 20 calls",
    "time": "20 minutes",
    "purpose": "Know who you'll call and what you'll say.",
    "intro": "In the first conversations you share what you're working on and ask what problems they see in their companies. The offer, if it comes up, arrives in a later conversation.",
    "trae": "Bring your contact list.",
    "where": "“Exit plan” kit, before Part 01",
    "level": "Level 0",
    "who": "Javier",
    "check": [
      "You have 20 names and the date of your first call."
    ]
  },
  "1-1": {
    "title": "Your three runways",
    "time": "25 minutes",
    "purpose": "You leave with your three runways, your goal and the month you reach it.",
    "intro": "Use your numbers from K.1 and K.3.",
    "trae": "Bring K.1 and K.3.",
    "where": "Chapter 1, The risk you don't see",
    "level": "Level 0",
    "who": "Carmen",
    "chapter": "The risk you don't see",
    "summary": [
      "Your base runway is your liquid savings divided by your monthly cost of living. Carmen's is 7.0 months.",
      "You calculate it in three scenarios: base, exit and with cuts. To decide, you use the base one.",
      "You set a goal of at least 6 months and the month you reach it. Carmen reaches 9 months in July."
    ],
    "check": [
      "You have your three runways to one decimal place.",
      "You know your goal and the month you reach it.",
      "You told your partner or someone you trust the number."
    ],
    "calc": {
      "A": {
        "label": "Liquid savings"
      },
      "B": {
        "label": "Monthly cost of living"
      },
      "base": {
        "label": "Base runway",
        "unit": "months",
        "show": "A ÷ B"
      },
      "C": {
        "label": "Estimated net severance (K.3)",
        "note": "The K.3 row for your country with what you would receive, net, if you're let go without cause."
      },
      "salida": {
        "label": "Exit runway",
        "unit": "months",
        "show": "(A + C) ÷ B"
      },
      "D": {
        "label": "Cost of living after cuts"
      },
      "recorte": {
        "label": "Runway with cuts",
        "unit": "months",
        "show": "A ÷ D"
      },
      "meta": {
        "label": "Base runway goal, in months"
      },
      "colchon": {
        "label": "Cushion goal",
        "show": "goal × B"
      },
      "brecha": {
        "label": "Gap",
        "show": "cushion goal − A"
      },
      "aporte1": {
        "label": "First savings or one-off payment",
        "note": "Profit sharing, statutory bonuses or bonuses."
      },
      "mes1": {
        "label": "Month of the first contribution",
        "ej": "April"
      },
      "aporte2": {
        "label": "Second savings or one-off payment"
      },
      "mes2": {
        "label": "Month of the second contribution",
        "ej": "July"
      },
      "mes": {
        "label": "Month you close the gap",
        "valores": {
          "ya la cerraste": "already closed",
          "todavía no": "not yet"
        }
      }
    },
    "bands": [
      "What you have",
      "Your goal",
      "Your plan"
    ],
    "avisos": [
      "Your base runway is below the method's 6-month minimum.",
      "To decide, use the base runway.",
      "With these two contributions you still don't close the gap. Add another contribution or review the goal."
    ]
  },
  "2-1": {
    "title": "Your three spending figures",
    "time": "40 minutes",
    "purpose": "You leave with your current cost of living, your cost of living without a job and your floor, with your runway recalculated.",
    "intro": "You need three months of statements from all your cards and accounts, and last year's annual payments. Write down the amounts per month, in your currency or in dollars, but the same one across the whole workbook. The book uses USD 1 = S/ 3.60 = COP 4,000 = MXN 18.50 = CLP 950.",
    "trae": "Bring three months of statements and last year's annual payments.",
    "where": "Chapter 2, Your real cost of living",
    "level": "Level 0",
    "who": "Carmen",
    "chapter": "Your real cost of living",
    "summary": [
      "Your cost of living has three figures: current, without a job and floor. Carmen's are USD 8,800, 9,400 and 8,000.",
      "Your current cost of living comes from three months of statements in four groups: fixed, variable, prorated annual and debt.",
      "From here on you calculate your runway with your cost of living without a job. Carmen's drops from 7.0 to 6.6 months."
    ],
    "check": [
      "You have your three spending figures and know where each one comes from.",
      "You asked for at least one quote to replace a benefit from your employer.",
      "Once you've talked it over at home: your family knows and accepts the floor."
    ],
    "calc": {
      "fijos": {
        "label": "Fixed"
      },
      "variables": {
        "label": "Variable"
      },
      "anuales": {
        "label": "Prorated annual",
        "note": "Year total ÷ 12."
      },
      "deudas": {
        "label": "Debt other than housing"
      },
      "A": {
        "label": "Current cost of living",
        "show": "sum of the four"
      },
      "B": {
        "label": "Benefits your employer pays today, at replacement cost",
        "note": "If you've already left, leave B at 0: what your employer paid is already in A."
      },
      "C": {
        "label": "Cost of living without a job",
        "show": "A + B"
      },
      "D": {
        "label": "Cuts agreed at home, excluding health and education"
      },
      "E": {
        "label": "Floor cost of living",
        "show": "C − D"
      },
      "ahorro": {
        "label": "Liquid savings (A from 1.1)"
      },
      "runway_c": {
        "label": "Runway with your cost of living without a job",
        "unit": "months",
        "show": "savings ÷ C"
      },
      "runway_e": {
        "label": "Runway with your floor cost of living",
        "unit": "months",
        "show": "savings ÷ E"
      },
      "nivel2": {
        "label": "Net own income level 2 will require",
        "show": "C"
      },
      "retorno": {
        "label": "Net own income the point of no return will require",
        "show": "1.2 × C"
      }
    },
    "bands": [
      "What you spend today",
      "Without your employer",
      "Your floor",
      "What changes"
    ],
    "avisos": [
      "With your cost of living without a job, your runway falls below the method's 6-month minimum."
    ]
  },
  "3-1": {
    "title": "Inventory of judgment and market value",
    "time": "30 minutes",
    "purpose": "You leave with five achievements you can talk about and your reference value for one day a week.",
    "intro": "You need your CV, your LinkedIn profile and two salary guides for your country. Write each achievement without your employer's amounts, clients, suppliers or documents.",
    "trae": "Bring your CV, your LinkedIn profile and two salary guides for your country.",
    "where": "Chapter 3, Your executive judgment is sellable",
    "level": "Level 0",
    "who": "Andrea",
    "chapter": "Your executive judgment is sellable",
    "summary": [
      "Your inventory is five achievements with the problem, your decision, the result and how you tell it without your employer's data.",
      "Its reference price is the market salary for the equivalent role at companies that have that problem.",
      "One day a week is worth that salary × 1/5 × 1.3. For Andrea that's USD 2,600 a month."
    ],
    "check": [
      "You have five achievements you can tell out loud without your employer's internal data.",
      "All five answer the same type of problem.",
      "You have a market salary with its source and a reference value per day."
    ]
  },
  "4-1": {
    "title": "Conflict of interest map",
    "time": "30 minutes",
    "purpose": "You leave with your conflict map, the draft of your request and your questions for the legal consultation.",
    "intro": "You need your completed K.2, your contract, the code of ethics and your company's outside activities policy. Each row gets an answer or an action. If you've already left your company, skip “The authorization” and fill in the last section.",
    "trae": "Bring your completed K.2, your contract and the outside activities policy.",
    "where": "Chapter 4, Fair play: contract, conflict of interest and transparency",
    "level": "Level 0",
    "who": "Andrea",
    "chapter": "Fair play: contract, conflict of interest and transparency",
    "summary": [
      "What's yours can be sold: your judgment, your network and your free time. The data, the clients, the internal information and your working hours belong to the company.",
      "When something falls in the gray zone or your policy requires it, you ask for written authorization before you start.",
      "Andrea asked for it on May 20 and Compliance approved it on July 8, with five conditions."
    ],
    "check": [
      "Every row of 4.1 has an answer or an action.",
      "You know whether you need authorization and who you'll ask for it.",
      "You have your questions for the legal consultation, even if you don't have it yet."
    ]
  },
  "5-1": {
    "title": "Your cash flow without a salary and your decision line",
    "time": "30 minutes",
    "purpose": "You leave with six months projected in two scenarios and your decision line in writing.",
    "intro": "You need your balance from K.1, your floor from K.4 or chapter 2 and the likely date of your first role. Write the amounts in your currency or in dollars, but the same one across the whole workbook; the book uses USD 1 = S/ 3.60 = COP 4,000 = MXN 18.50 = CLP 950. If you still have a job, use your cost of living without a job and don't count severance.",
    "trae": "Bring your balance from K.1 and your floor from K.4 or chapter 2.",
    "where": "Chapter 5, If you're let go tomorrow",
    "level": "Level 0",
    "who": "Javier",
    "chapter": "If you're let go tomorrow",
    "summary": [
      "Without a salary, your savings become a six-month cash flow in two scenarios: no income, and with your first role.",
      "You set a decision line with a date, an income condition and a minimum balance, and you agree on it at home in the first month.",
      "Javier's is triggered if by July 31 he doesn't have a second income signed or if his savings drop below USD 20,000."
    ],
    "check": [
      "You have six months projected in both scenarios.",
      "Your decision line has a date, an income condition and a minimum balance.",
      "Once you've talked it over at home: you agreed on it with your family and it's in writing."
    ],
    "calc": {
      "saldo": {
        "label": "Starting balance for the first month"
      },
      "gasto": {
        "label": "Monthly spending: floor cost of living, or cost of living without a job if you're still employed"
      },
      "ingreso": {
        "label": "Expected net income per month"
      },
      "inicio": {
        "label": "Month that income arrives (1 to 6)",
        "note": "If your client pays at 30 or 60 days, move the first income to that month."
      },
      "pares": {
        "label": "Months of minimum balance",
        "note": "How long it took three peers at your level and in your sector to get back into a job. Never less than 2."
      },
      "minimo": {
        "label": "Minimum balance",
        "show": "months × spending, never less than 2 months"
      },
      "f1": {
        "label": "With a role, month 1"
      },
      "f2": {
        "label": "With a role, month 2"
      },
      "f3": {
        "label": "With a role, month 3"
      },
      "f4": {
        "label": "With a role, month 4"
      },
      "f5": {
        "label": "With a role, month 5"
      },
      "f6": {
        "label": "With a role, month 6"
      },
      "r1": {
        "label": "Runway with a role, month 1"
      },
      "r2": {
        "label": "Runway with a role, month 2"
      },
      "r3": {
        "label": "Runway with a role, month 3"
      },
      "r4": {
        "label": "Runway with a role, month 4"
      },
      "r5": {
        "label": "Runway with a role, month 5"
      },
      "r6": {
        "label": "Runway with a role, month 6"
      },
      "s1": {
        "label": "No income, month 1"
      },
      "s2": {
        "label": "No income, month 2"
      },
      "s3": {
        "label": "No income, month 3"
      },
      "s4": {
        "label": "No income, month 4"
      },
      "s5": {
        "label": "No income, month 5"
      },
      "s6": {
        "label": "No income, month 6"
      },
      "q1": {
        "label": "Runway with no income, month 1"
      },
      "q2": {
        "label": "Runway with no income, month 2"
      },
      "q3": {
        "label": "Runway with no income, month 3"
      },
      "q4": {
        "label": "Runway with no income, month 4"
      },
      "q5": {
        "label": "Runway with no income, month 5"
      },
      "q6": {
        "label": "Runway with no income, month 6"
      },
      "cae_rol": {
        "label": "With a role, first month below the minimum balance"
      },
      "cae_sin": {
        "label": "With no income, first month below the minimum balance"
      }
    },
    "bands": [
      "Your starting point",
      "Your minimum balance"
    ],
    "tables": [
      {
        "table": "Your projection with a role",
        "head": [
          "Month",
          "Ending balance",
          "Runway"
        ],
        "rows": [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Month 6"
        ]
      },
      {
        "table": "Your projection with no income",
        "head": [
          "Month",
          "Ending balance",
          "Runway"
        ],
        "rows": [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Month 6"
        ]
      }
    ],
    "avisos": [
      "With no income, your balance falls below the minimum within the six months. That month sets your decision line.",
      "In one of the scenarios the balance turns negative before month 6."
    ]
  },
  "6-1": {
    "title": "Map of USD 100,000 problems",
    "time": "30 minutes",
    "purpose": "You leave with a problem that passes the four filters, with its annual cost and its monthly cost of inaction.",
    "intro": "You need your template 3.1 and one public figure for each sector you have in mind. Write first the problem that costs the client the most; the other two go below.",
    "trae": "Bring your template 3.1.",
    "where": "Chapter 6, The USD 100,000 problem",
    "level": "Level 0",
    "who": "Carmen",
    "chapter": "The USD 100,000 problem",
    "summary": [
      "You pick a problem that costs your client at least USD 100,000 a year and that you've solved before.",
      "You run it through four filters: size, experience, recognition and measurement. If it fails one, it's out or becomes an extra benefit.",
      "Carmen's costs USD 150,000 a year, USD 12,500 for each month it goes unsolved, and supports up to USD 30,000 in fees."
    ],
    "check": [
      "You have a problem that passes the four filters.",
      "You know its annual cost, how you calculated it and its monthly cost of inaction.",
      "You can explain it in one sentence to someone who doesn't work in your industry."
    ],
    "calc": {
      "costo": {
        "label": "Annual cost of problem 1",
        "note": "The math with figures the client would recognize: rates, hours, lost sales, fines."
      },
      "noactuar": {
        "label": "Monthly cost of inaction",
        "show": "annual cost ÷ 12"
      },
      "honorarios": {
        "label": "Annual fees it supports",
        "show": "annual cost ÷ 5"
      }
    },
    "avisos": [
      "The problem costs less than USD 100,000 a year. Check the math or look for a bigger one before you continue."
    ]
  },
  "7-1": {
    "title": "Segmentation matrix",
    "time": "30 minutes",
    "purpose": "You leave with your entry point and its score, its neighbors and a list of 10 named companies.",
    "intro": "Use the problem from your template 6.1. Write three to five segments, run each one through the conflict filter and score the ones that pass. At the end, write down the winner and the 10 named companies.",
    "trae": "Bring your template 6.1 and your template 4.1.",
    "where": "Chapter 7, Your entry point",
    "level": "Level 0",
    "who": "Rodrigo",
    "chapter": "Your entry point",
    "summary": [
      "You split your market into segments: groups of companies that buy for the same reasons, in the same way and from similar people.",
      "You remove the ones that create a conflict of interest and score the rest from 1 to 5 on six criteria, with a maximum of 30.",
      "Rodrigo picks online furniture and home decor stores, with 24 points, and can name 14 stores in the segment today."
    ],
    "check": [
      "You have an entry point with its score and you know why it won.",
      "You checked each segment against the conflict filter before scoring it.",
      "You have a list of 10 named companies within the segment."
    ]
  },
  "8-1": {
    "title": "Buyer map",
    "time": "25 minutes",
    "purpose": "You leave with a map of who decides at your client, the order of your conversations and your estimated timeline.",
    "intro": "Use the company where you have a contact in your entry point (7.1). In each row write who it is, the job they want to get done, what they fear, what they need to see and when they come into the process. One person can play two roles.",
    "trae": "Bring your template 7.1.",
    "where": "Chapter 8, Who decides and why they buy",
    "level": "Level 0",
    "who": "Carmen",
    "chapter": "Who decides and why they buy",
    "summary": [
      "Six roles take part in a purchase: champion, economic buyer, user, influencers, veto and procurement.",
      "For each person you write down the job they want to get done, what they fear and what they need to see. Then you put the steps in order and estimate the timeline.",
      "At the agricultural exporter, the purchase of Carmen's role has five steps and takes six to eight weeks."
    ],
    "check": [
      "You know who decides, who can veto and what each person on the map wants to achieve.",
      "You have the order of the conversations and what you'll show in each one.",
      "You know the date the approver meets and your estimated timeline."
    ]
  },
  "9-1": {
    "title": "Quick TAM",
    "time": "25 minutes",
    "purpose": "You leave with how many clients you need, what share of the market they are and your decision: continue, widen or rethink.",
    "intro": "Use your entry point from template 7.1. Count your named clients in a public source before you fill in the numbers, and write the amounts in dollars.",
    "trae": "Bring your template 7.1.",
    "where": "Chapter 9, Is the market big enough?",
    "level": "Level 0",
    "who": "Andrea",
    "chapter": "Is the market big enough?",
    "summary": [
      "You count your possible clients by name in a public source and remove the ones you couldn't serve because of a conflict of interest.",
      "With the annual price you calculate the TAM, and with the clients you need, your capture rate. If it's over 10%, you widen or rethink.",
      "Andrea needs 15 of 240 fintechs in four countries, 6.25%. In Mexico alone it would be 25%."
    ],
    "check": [
      "You know how many clients you need in the first year and what percentage that is of the market you can serve.",
      "You counted your possible clients by name in a public source.",
      "You made a decision: continue, widen or rethink."
    ],
    "calc": {
      "perimetro": {
        "label": "Clients within your perimeter",
        "note": "Without the ones you couldn't serve because of a conflict of interest."
      },
      "precio": {
        "label": "Annual price per client",
        "note": "The one you'll put in your proposal, before withholdings."
      },
      "tam": {
        "label": "TAM",
        "show": "perimeter × price"
      },
      "necesitas": {
        "label": "Clients you need in the first year"
      },
      "tasa": {
        "label": "Capture rate",
        "show": "clients you need ÷ perimeter"
      },
      "perimetro_chico": {
        "label": "Smaller perimeter",
        "note": "For example, your country only."
      },
      "tasa_chica": {
        "label": "The same rate with the smaller perimeter",
        "show": "clients you need ÷ smaller perimeter"
      },
      "conversaciones": {
        "label": "Conversations you need in the year",
        "note": "Add the second conversations if each sale requires them."
      },
      "horas": {
        "label": "Hours per conversation, including preparation"
      },
      "horas_total": {
        "label": "Selling hours in the year",
        "show": "conversations × hours"
      }
    },
    "bands": [
      "Your math",
      "Your selling time"
    ],
    "avisos": [
      "Your capture rate is 10% or less: you continue.",
      "Your capture rate is over 10%: you widen the perimeter. If it's still over 10% after widening, you rethink.",
      "With the smaller perimeter the rate goes over 10%. The wide perimeter is the one that supports the decision."
    ]
  },
  "10-1": {
    "title": "Quantified proposal",
    "time": "30 minutes",
    "purpose": "You leave with your price range, with its floor and ceiling, and your result in one sentence with a figure.",
    "intro": "Use the problem and the cost from template 6.1 and your floor cost of living from 2.1. Calculate the ceiling first, with figures the client can check, and then the floor, with yours. The figures go in dollars: A and B are per year and the rest per month.",
    "trae": "Bring your template 6.1 and your floor cost of living from 2.1.",
    "where": "Chapter 10, Your value proposition, in numbers",
    "level": "Level 0",
    "who": "Carmen",
    "chapter": "Your value proposition, in numbers",
    "summary": [
      "Your ceiling is the annual value your work leaves the client, divided by 5 and by 12 months. Carmen's is USD 2,500 a month.",
      "Your floor is your floor cost of living divided by 5 and by your country's net factor, for each weekly day. Carmen's is USD 2,133.",
      "Your price goes between the two. Carmen has a range with one day a week; with two, the floor goes above the ceiling."
    ],
    "check": [
      "You have a range with its floor and its ceiling, and you know where each number comes from.",
      "The annual value is calculated with figures your client can check.",
      "You wrote the result in one sentence with its figure."
    ],
    "calc": {
      "A": {
        "label": "Annual value",
        "note": "With figures the client can check."
      },
      "B": {
        "label": "Annual ceiling",
        "show": "A ÷ 5"
      },
      "C": {
        "label": "Monthly ceiling",
        "show": "B ÷ 12"
      },
      "D": {
        "label": "Floor cost of living (2.1)",
        "note": "Or the spending agreed in K.4 if you've already left, like Javier."
      },
      "E": {
        "label": "Net floor per weekly day",
        "show": "D ÷ 5"
      },
      "F": {
        "label": "Your country's net factor",
        "note": "It's an estimate from the book. Confirm yours with whoever handles your taxes.",
        "options": {
          "0,75": "Peru, 0.75",
          "0,65": "Mexico, 0.65",
          "0,70": "Colombia, 0.70",
          "0,8475": "Chile, 0.8475"
        }
      },
      "G": {
        "label": "Gross monthly floor per weekly day",
        "show": "E ÷ F"
      },
      "dias": {
        "label": "Days per week you'll offer"
      },
      "piso": {
        "label": "Monthly range, from",
        "show": "G × days"
      },
      "techo": {
        "label": "Monthly range, up to",
        "show": "C"
      }
    },
    "bands": [
      "The problem and its value",
      "The ceiling",
      "The floor",
      "Your range"
    ],
    "avisos": [
      "G × days goes above C: review the problem or the days before you offer anything."
    ]
  },
  "11-1": {
    "title": "Your role on one page and its price",
    "time": "35 minutes",
    "purpose": "You leave with your one-pager with its fee, its premium and the ten clauses of your contract.",
    "intro": "Use your range from template 10.1 and a public salary guide for your country. Calculate the fee first and check that it falls within your range; then write your one-pager and check off the clauses with your model contract beside you.",
    "trae": "Bring your range from 10.1 and a salary guide for your country.",
    "where": "Chapter 11, Your first part-time role: format, price and contract",
    "level": "Level 0",
    "who": "Carmen",
    "chapter": "Your first part-time role: format, price and contract",
    "summary": [
      "Your first role fits on one page with six parts: the problem, the result with its figure, the format and time commitment, the price, the duration and the contract terms.",
      "The fee is the market salary for the equivalent role, times your days ÷ 5 and times a premium of 1.2 to 1.5. Carmen's is USD 2,200 a month.",
      "The contract has ten minimum clauses. If you have a job, your hours stay outside your employer's working hours."
    ],
    "check": [
      "You have your one-pager and it fits on one page.",
      "Your fee is within the range of template 10.1 and you know which premium you used.",
      "You know which hours of your week you'll work, outside your employer's working hours.",
      "You know when and how you'll inform your employer, if your contract or its policy requires it."
    ],
    "calc": {
      "A": {
        "label": "Monthly market salary",
        "note": "From a public salary guide for your country."
      },
      "dias": {
        "label": "Days per week"
      },
      "B": {
        "label": "Days per week ÷ 5",
        "show": "days ÷ 5"
      },
      "C": {
        "label": "Premium",
        "note": "From 1.2 to 1.5."
      },
      "tarifa": {
        "label": "Monthly fee",
        "show": "A × B × C"
      },
      "piso10": {
        "label": "Floor of the range (G × days from 10.1)"
      },
      "techo10": {
        "label": "Ceiling of the range (C from 10.1)"
      },
      "rango": {
        "label": "Within the 10.1 range?"
      },
      "prima_piso": {
        "label": "Premium at your floor",
        "show": "floor × 5 ÷ (A × days)"
      },
      "prima_techo": {
        "label": "Premium at your ceiling",
        "show": "ceiling × 5 ÷ (A × days)"
      },
      "valor": {
        "label": "Annual value (A from 10.1)"
      },
      "veces": {
        "label": "Annual value ÷ annual fee",
        "show": "value ÷ (fee × 12), at least 5"
      }
    },
    "bands": [
      "The fee",
      "Your range from 10.1",
      "The value rule"
    ],
    "avisos": [
      "The premium goes from 1.2 to 1.5.",
      "Your fee goes above the 10.1 ceiling: reduce the scope or the premium.",
      "Your fee falls below the 10.1 floor: review the days.",
      "The annual value doesn't reach 5 times your annual fee."
    ]
  },
  "12-1": {
    "title": "Product sheet",
    "time": "30 minutes",
    "purpose": "You leave with your product sheet with its price, its hours in the first year and the status of your validation.",
    "intro": "Use your deliverables from recent months and the TAM from template 9.1. Start with what repeats: if you can't find anything identical in three deliverables, note it under “Your decision” and continue with part-time roles. The figures go in dollars.",
    "trae": "Bring your last three deliverables and your TAM from 9.1.",
    "where": "Chapter 12, From service to product",
    "level": "Levels 0 to 2",
    "who": "Andrea",
    "chapter": "From service to product",
    "summary": [
      "A product comes from what repeats the same way with every client. Andrea packages her 80-control matrix into a USD 1,800 annual license.",
      "You validate it by charging before you build all of it. Andrea sold three presales with 50% paid up front, USD 2,700, before she finished it.",
      "With 15 licenses, each hour leaves her about USD 237 gross; with 6, about 103, less than the 125 from the advisory board."
    ],
    "check": [
      "You have a product sheet with scope and price, and you know how many hours it takes in the first year.",
      "If you have a job, you know whether your product needs a new authorization and you asked for it.",
      "When it happens: at least three clients paid for a presale, or you decided in writing to continue with part-time roles only."
    ]
  },
  "13-1": {
    "title": "Unit economics",
    "time": "35 minutes",
    "purpose": "You leave with your LTV, your CAC and how much your net income changes with the clients you plan to win.",
    "intro": "You need your business's income and costs for the last three months, in dollars per month. Fill in the first column with your current clients and the second with the segment you want to win. If your path is a part-time role, go straight to the three-line version at the end of this template.",
    "trae": "Bring your business's income and costs for the last three months, or your fee from 11.1 if your path is a part-time role.",
    "where": "Chapter 13, Unit economics",
    "level": "Levels 0 to 2",
    "who": "Rodrigo",
    "chapter": "Unit economics",
    "summary": [
      "A client is worth the margin they leave you each month times the months they stay. Rodrigo's new client is worth USD 12,000.",
      "It's worth winning them if that value is at least 3 times what it costs. Rodrigo pays USD 1,600 per client: 7.5 times.",
      "Four new clients, with the van and the tax, leave Rodrigo USD 900 more net a month."
    ],
    "check": [
      "You know how much a client leaves you over the whole relationship and how much it costs to win them.",
      "Your LTV ÷ CAC is at least 3, or you know what to change to get there.",
      "You know how much your net income changes with the clients you plan to win and who pays their CAC."
    ],
    "calc": {
      "a1": {
        "label": "Income per client per month"
      },
      "b1": {
        "label": "Variable costs per client"
      },
      "c1": {
        "label": "Contribution margin",
        "show": "A − B"
      },
      "cp1": {
        "label": "Margin on income",
        "show": "C ÷ A"
      },
      "d1": {
        "label": "Average lifetime in months"
      },
      "e1": {
        "label": "LTV",
        "show": "C × D"
      },
      "f1": {
        "label": "CAC"
      },
      "lc1": {
        "label": "LTV ÷ CAC",
        "show": "E ÷ F"
      },
      "rc1": {
        "label": "Months to recover the CAC",
        "show": "F ÷ C"
      },
      "a2": {
        "label": "Income per client per month"
      },
      "b2": {
        "label": "Variable costs per client"
      },
      "c2": {
        "label": "Contribution margin",
        "show": "A − B"
      },
      "cp2": {
        "label": "Margin on income",
        "show": "C ÷ A"
      },
      "d2": {
        "label": "Average lifetime in months"
      },
      "e2": {
        "label": "LTV",
        "show": "C × D"
      },
      "f2": {
        "label": "CAC"
      },
      "lc2": {
        "label": "LTV ÷ CAC",
        "show": "E ÷ F"
      },
      "rc2": {
        "label": "Months to recover the CAC",
        "show": "F ÷ C"
      },
      "G": {
        "label": "New clients"
      },
      "H": {
        "label": "Additional fixed cost",
        "note": "The one that rises with volume: a van, one more person."
      },
      "I": {
        "label": "Incremental profit before tax",
        "show": "G × C − H"
      },
      "tasa_pct": {
        "label": "Tax rate (%)",
        "note": "The one you confirmed with whoever handles your taxes."
      },
      "J": {
        "label": "Tax",
        "show": "I × rate"
      },
      "K": {
        "label": "Incremental net profit",
        "show": "I − J"
      },
      "parte_pct": {
        "label": "Your share of the company (%)",
        "note": "If you don't share the company, 100."
      },
      "parte": {
        "label": "Your share",
        "show": "K × your percentage"
      },
      "total": {
        "label": "Your total net income today"
      },
      "total_nuevo": {
        "label": "Your net income with the new clients",
        "show": "today + your share"
      },
      "brecha": {
        "label": "Your monthly gap",
        "note": "What you're short each month of your net income goal."
      },
      "cierran": {
        "label": "Clients that close it",
        "show": "the smallest number of clients whose share covers the gap"
      }
    },
    "bands": [
      "Current segment",
      "New segment",
      "New clients from the new segment",
      "Your gap"
    ],
    "avisos": [
      "In one segment, LTV ÷ CAC is below 3. Work out what to change to get there before you pay for new clients.",
      "With these new clients your share doesn't cover the gap."
    ]
  },
  "14-1": {
    "title": "Your 30 accounts",
    "time": "30 minutes",
    "purpose": "You leave with your 30 accounts, their split by group and your funnel.",
    "intro": "Use your list from K.5 as a starting point. Before you write, cross out the accounts your conflict map (4.1) or your exit agreement prevents you from contacting. Write your three-sentence message first, fill in the split by group and then write one account per row, with the same number in the list's three tables.",
    "trae": "Bring your list from K.5.",
    "where": "Chapter 14, Your network as a channel",
    "level": "Level 0",
    "who": "Javier",
    "chapter": "Your network as a channel",
    "summary": [
      "You build a list of 30 accounts, companies where you know at least one person, split into five groups.",
      "You write a three-sentence message about a problem and, ten days later, send a follow-up that's useful to the other person.",
      "Javier wrote to 30 accounts and signed 2 contracts before July 31, the date of his decision line."
    ],
    "check": [
      "You have 30 accounts with a company, a person and a likely problem.",
      "You sent the first ten messages.",
      "Every message you sent has a follow-up date."
    ],
    "calc": {
      "g_jefes": {
        "label": "People who were your bosses or directors"
      },
      "g_clientes": {
        "label": "Clients and suppliers from previous jobs"
      },
      "g_colegas": {
        "label": "Colleagues who already work on their own"
      },
      "g_firmas": {
        "label": "Search firms and consultancies"
      },
      "g_gremio": {
        "label": "Trade group, association and university"
      },
      "g_total": {
        "label": "Total",
        "show": "sum of the groups"
      },
      "e_escribiste": {
        "label": "Accounts you wrote to"
      },
      "e_respuestas": {
        "label": "Replies"
      },
      "p_respuestas": {
        "label": "Replies per account",
        "show": "replies ÷ accounts"
      },
      "e_conversaciones": {
        "label": "Conversations"
      },
      "p_conversaciones": {
        "label": "Conversations per reply",
        "show": "conversations ÷ replies"
      },
      "e_propuestas": {
        "label": "Proposals"
      },
      "p_propuestas": {
        "label": "Proposals per conversation",
        "show": "proposals ÷ conversations"
      },
      "e_firmadas": {
        "label": "Signed"
      },
      "p_firmadas": {
        "label": "Signed per proposal",
        "show": "signed ÷ proposals"
      }
    },
    "bands": [
      "Accounts by group",
      "Your funnel"
    ],
    "avisos": [
      "Your list has fewer than 30 accounts."
    ]
  },
  "15-1": {
    "title": "Script for the diagnostic conversation",
    "time": "25 minutes",
    "purpose": "You leave with your question script and the sheet to note what you confirmed in each meeting.",
    "intro": "Write your questions before the meeting and bring this sheet printed or on your tablet. Before the meeting, tick the three control boxes. Ask about past facts: what happened, how much it cost them, who solved it. After the meeting, fill in the next sheet.",
    "trae": "Bring 11.1, your list from 14.1 and your buyer map from 8.1.",
    "where": "Chapter 15, The diagnostic conversation",
    "level": "Level 0",
    "who": "Carmen",
    "chapter": "The diagnostic conversation",
    "summary": [
      "In the first meeting you ask about past facts and let the client calculate how much their problem costs them.",
      "An hour is split into five moments, and you do most of the talking in the ten minutes of the last one.",
      "The manager at the agricultural exporter used her own numbers to calculate savings of USD 150,000 a year and agreed to a meeting with a date."
    ],
    "check": [
      "You have a written script with your questions.",
      "You had at least one conversation with that script.",
      "You came out of it with a next step with a date, or with a date to talk again."
    ],
    "head": [
      {
        "label": "Account, person and date of the meeting",
        "parts": {
          "cuenta": "Account",
          "persona": "Person",
          "fecha": "Date"
        }
      }
    ]
  },
  "16-1": {
    "title": "Proposal, contract and first invoice",
    "time": "40 minutes",
    "purpose": "You leave with your disclosure, your contract and your first invoice, with the reserve for tax.",
    "intro": "Have at hand your employment contract or your exit agreement, 4.1, 11.1 and your tax registration number. Fill in the three parts in order: the disclosure comes before the client's approval, the signature before the first day of work and the invoice at the close of the first month. When you issue the first one, also write the date in “Your level on the ladder”, at the start of the workbook.",
    "trae": "Bring 4.1 and 11.1.",
    "where": "Chapter 16, The first contract and the first invoice",
    "level": "Level 0",
    "who": "Carmen",
    "chapter": "The first contract and the first invoice",
    "summary": [
      "You disclose to your employer if it applies, sign the contract, do the work and at the close of the first month issue the invoice, in that order.",
      "Your contract says what you do, how much you charge, how it ends and what you won't do.",
      "Of every USD 2,200 she bills, Carmen puts 1,650 into her cushion. Her first receipt, on October 31, puts her at level 1."
    ],
    "check": [
      "You have the disclosure to your employer and its reply in writing, if it applied to you.",
      "When it happens: the contract is signed by both parties.",
      "You issued your first invoice and wrote the date in the monthly log, at the start of the workbook."
    ]
  },
  "17-1": {
    "title": "Weekly schedule and home agreements",
    "time": "25 minutes",
    "purpose": "You leave with your eight-hour week, your three home agreements and your energy log.",
    "intro": "Keep your calendar for the next four weeks open. Each block has a day, a time and a purpose, outside your employer's hours. If the total goes over eight hours, decide what you delegate or put off before you continue. If you've already left, leave the employer hours blank and write down your days per client and the day you keep free.",
    "trae": "Bring your calendar for the next four weeks.",
    "where": "Chapter 17, Your schedule, your energy and your family",
    "level": "Levels 0 and 1",
    "who": "Andrea",
    "chapter": "Your schedule, your energy and your family",
    "summary": [
      "You set the hours of your plan in your calendar, outside your employer's working hours, with a cap of eight a week.",
      "You write down three agreements at home and each week you review your hours, your sleep and your free weekends.",
      "Andrea delegated ten hours a month for USD 250 and her week fit into eight hours again."
    ],
    "check": [
      "Your blocks are in the calendar with a day and a time.",
      "You know which task you delegate, to whom and how much it costs.",
      "Once you've talked it over at home: your family read and accepted the three agreements."
    ],
    "calc": {
      "bloque1": {
        "label": "Block 1"
      },
      "bloque2": {
        "label": "Block 2"
      },
      "bloque3": {
        "label": "Block 3"
      },
      "revision": {
        "label": "Weekly review"
      },
      "margen": {
        "label": "Margin"
      },
      "total": {
        "label": "Weekly total",
        "unit": "hours",
        "show": "sum of the blocks, cap of 8"
      }
    },
    "bands": [
      "Hours per week for each block"
    ],
    "avisos": [
      "Your week goes over eight hours. Decide what you delegate or put off before you continue."
    ]
  },
  "18-1": {
    "title": "Portfolio dashboard",
    "time": "30 minutes",
    "purpose": "You leave with your dashboard showing the net, weight and renewal of each role, and your two gaps to the point of no return.",
    "intro": "You need your contracts and your invoices from the last three months. First you fill in one column per role and then the bottom of the dashboard. Write everything in dollars per month.",
    "trae": "Bring your contracts and invoices.",
    "where": "Chapter 18, From first role to portfolio",
    "level": "Level 1",
    "who": "Javier",
    "chapter": "From first role to portfolio",
    "summary": [
      "You track your roles together each month with their net, their days, their weight and their renewal. Javier makes 10,150 net with three roles.",
      "No client goes over 50% of your income, and each renewal is prepared 60 days in advance.",
      "The bottom of the dashboard tells you your level and your two gaps. Javier is 1,850 a month and 36,540 of cushion short."
    ],
    "check": [
      "Your dashboard has all your roles, with their net, their weight and their renewal date.",
      "You know whether you covered your cost of living without a job this month and how many months in a row you're at.",
      "You know your income gap and your cushion gap to the point of no return."
    ],
    "calc": {
      "bruto1": {
        "label": "Role 1"
      },
      "bruto2": {
        "label": "Role 2"
      },
      "bruto3": {
        "label": "Role 3"
      },
      "bruto4": {
        "label": "Role 4"
      },
      "factor": {
        "label": "Net factor",
        "note": "The 0.70 is an estimate from the book for middle incomes. Ask your accountant for the factor in your case."
      },
      "neto1": {
        "label": "Net from role 1"
      },
      "neto2": {
        "label": "Net from role 2"
      },
      "neto3": {
        "label": "Net from role 3"
      },
      "neto4": {
        "label": "Net from role 4"
      },
      "total": {
        "label": "Total net with average success fee",
        "show": "sum of the nets"
      },
      "peso1": {
        "label": "Weight of role 1"
      },
      "peso2": {
        "label": "Weight of role 2"
      },
      "peso3": {
        "label": "Weight of role 3"
      },
      "peso4": {
        "label": "Weight of role 4"
      },
      "cvm": {
        "label": "Cost of living without a job (2.1)"
      },
      "cubriste": {
        "label": "Did you cover it this month?"
      },
      "brechaing": {
        "label": "Income gap",
        "show": "1.2 × cost of living − average net"
      },
      "colchon": {
        "label": "Current cushion"
      },
      "brechacol": {
        "label": "Cushion gap",
        "show": "6 × cost of living − cushion"
      }
    },
    "bands": [
      "Your roles, gross per month",
      "This month",
      "Point of no return"
    ],
    "tables": [
      {
        "table": "Net and weight of each role",
        "head": [
          "Role",
          "Net",
          "Weight"
        ],
        "rows": [
          "Role 1",
          "Role 2",
          "Role 3",
          "Role 4"
        ]
      }
    ],
    "avisos": [
      "One client goes over 50% of your income. Open new accounts before its renewal.",
      "Each month, copy the total net and your cushion to the monthly log, at the start of the workbook."
    ]
  },
  "19-1": {
    "title": "Point of no return",
    "time": "25 minutes",
    "purpose": "You leave with your two conditions measured, what you're missing on each and the date of your next review.",
    "intro": "Use your cost of living without a job from template 2.1 and your invoices from the last three months. Own income goes net of taxes and contributions, without counting your salary.",
    "trae": "Bring your template 2.1 and your invoices from the last three months.",
    "where": "Chapter 19, The point of no return",
    "level": "Level 2",
    "who": "Rodrigo",
    "chapter": "The point of no return",
    "summary": [
      "You reach the point of no return with two conditions at once: net own income of 1.2 × your cost of living three months in a row and a cushion of 6 × your cost of living.",
      "Rodrigo needs 8,400 a month and gets 8,500. His cushion of 46,700 is above the 42,000.",
      "If you're missing one condition, the framework tells you what to move first. With both, going back to a job becomes a choice."
    ],
    "check": [
      "You know which of the two conditions you meet and how far you are from the other.",
      "You have the date of your next review in your calendar.",
      "You have in writing what you would do if you were offered a full-time job tomorrow."
    ],
    "calc": {
      "A": {
        "label": "Cost of living without a job (2.1)"
      },
      "c1": {
        "label": "Condition 1",
        "show": "1.2 × A"
      },
      "mes1": {
        "label": "Net own income, month 1"
      },
      "mes2": {
        "label": "Net own income, month 2"
      },
      "mes3": {
        "label": "Net own income, month 3"
      },
      "cumple1": {
        "label": "Does it meet condition 1 all three months?"
      },
      "c2": {
        "label": "Condition 2",
        "show": "6 × A"
      },
      "colchon": {
        "label": "Current cushion",
        "note": "Your liquid savings."
      },
      "cumple2": {
        "label": "Does it meet condition 2?"
      },
      "brechaing": {
        "label": "Income gap",
        "show": "condition 1 − the lowest of the three months"
      },
      "brechacol": {
        "label": "Cushion gap",
        "show": "condition 2 − cushion"
      }
    },
    "bands": [
      "Your cost of living",
      "Condition 1, income",
      "Condition 2, cushion",
      "What you're missing"
    ],
    "avisos": [
      "You meet: neither. You're missing: both. What you do: you stay at level 1 or 2. You work on the portfolio from chapter 18 and set aside a fixed amount for the cushion every month.",
      "You meet: cushion. You're missing: income. What you do: you stay at your current level. You raise your income with the portfolio: price at renewals, one more role or a product. The cushion stays for emergencies and isn't used to cover the income gap.",
      "You meet: income. You're missing: cushion. What you do: you save all the surplus above your cost of living until you close the gap, before any leap.",
      "You meet: both. You're missing: nothing. What you do: you're at level 3. You review both conditions every month, as chapter 21 explains."
    ]
  },
  "20-1": {
    "title": "Script and comparison of options",
    "time": "35 minutes",
    "purpose": "You leave with your written script, the effect of each option on your numbers and who will review what you sign.",
    "intro": "Use your updated K.3 and your template 19.1. Fill it in with the conversation that's closest, even if it's only the annual disclosure. The figures go in your currency or in dollars, the same one across the sheet.",
    "trae": "Bring your updated K.3 and your template 19.1.",
    "where": "Chapter 20, The conversation with your employer",
    "level": "Levels 1 and 2",
    "who": "Carmen",
    "chapter": "The conversation with your employer",
    "summary": [
      "There are three conversations with your employer: disclosing, asking and agreeing on an exit. Each one has a four-part script.",
      "Before you answer, you compare each option on your cushion, your income and your level. The exit leaves Carmen 213,750, 22.7 months.",
      "You offer an orderly transition and a services contract. Carmen leaves with an advisory contract of 3,000 a month for the mining company."
    ],
    "check": [
      "You have a written script for your next conversation with your employer.",
      "You know the effect of each option on your cushion, your income and your level.",
      "You know who will review any document before you sign it."
    ]
  },
  "21-1": {
    "title": "90-day plan or criteria for staying",
    "time": "30 minutes",
    "purpose": "You leave with your 90-day plan or your criteria for staying, with their date, and your monthly review in the calendar.",
    "intro": "Fill in the version that matches your decision. Use your template 19.1, your 18.1 dashboard and the monthly log at the start of the workbook, with the figures in dollars.",
    "trae": "Bring your template 19.1 and your 18.1 dashboard.",
    "where": "Chapter 21, Independence: make the leap or stay",
    "level": "Levels 2 and 3",
    "who": "Rodrigo and Andrea",
    "chapter": "Independence: make the leap or stay",
    "summary": [
      "If you make the leap, you build a 90-day plan with one main risk, three dated actions and a warning sign. Rodrigo lowers the weight of the pharmacy chain from 47% to 44%.",
      "If you stay, you write three criteria to review the decision and a date. Andrea will review it in June of the following year.",
      "Both decisions use the figures from chapter 19 and a review of your numbers on the first day of each month."
    ],
    "check": [
      "You have a 90-day plan with three dated actions, or three written criteria with a review date.",
      "You know your warning sign or what would make you review your decision early.",
      "Your monthly review is in the calendar.",
      "Once you've talked it over at home: your family knows your plan and your warning sign."
    ]
  },
  "a-1": {
    "title": "Your rules in Peru",
    "time": "25 minutes",
    "purpose": "You leave with your rules for Peru on one page.",
    "intro": "Have at hand your contract, the internal work rules, your latest pay slips and your RUC record. Write the amounts in soles, in the same order as Carmen's example in Appendix A.",
    "trae": "Bring your contract, the internal work rules, your latest pay slips and your RUC record.",
    "where": "Appendix A, Peru",
    "who": "Carmen",
    "summary": [
      "If you're let go without cause, you get 1.5 monthly salaries per year with a cap of 12. For Carmen that's S/ 588,000.",
      "Your fees are fourth-category income. The client withholds 8% and you pay the rest of the tax in the annual return.",
      "Carmen sets aside S/ 1,346 from each S/ 7,920 receipt in a separate account for that return."
    ]
  },
  "b-1": {
    "title": "Your rules in Mexico",
    "time": "25 minutes",
    "purpose": "You leave with your rules for Mexico on one page.",
    "intro": "Have at hand your contract, your latest payroll receipts, your start date and the Compliance policy. Write the amounts in pesos, in the same order as Andrea's example in Appendix B.",
    "trae": "Bring your contract, your latest payroll receipts, your start date and the Compliance policy.",
    "where": "Appendix B, Mexico",
    "who": "Andrea",
    "summary": [
      "If you're let go without cause and not reinstated, you get three months of salary plus 20 days per year. For Andrea that's MXN 2,250,000, a floor.",
      "With income over MXN 3.5 million a year you fall outside RESICO and file your ISR payments and your VAT (IVA) return every month.",
      "Payment for an advisory board seat can be treated as salary-like income. The net doesn't change, but the monthly deposit does."
    ]
  },
  "c-1": {
    "title": "Your rules in Colombia",
    "time": "25 minutes",
    "purpose": "You leave with your rules for Colombia on one page.",
    "intro": "Have at hand your contract, your final settlement and the value of the first contract you're going to sign. Write the amounts in pesos, in the same order as Javier's example in Appendix C.",
    "trae": "Bring your contract, your final settlement and the value of your first contract.",
    "where": "Appendix C, Colombia",
    "who": "Javier",
    "summary": [
      "With a comprehensive salary, dismissal without just cause is worth 20 days for the first year and 15 for each following year. Javier is owed 65 days.",
      "If a contract is worth 3,500 UVT or more over its whole duration, or your income last year or this year goes over 3,500 UVT, you register for VAT before you sign it.",
      "As an independent worker you pay health, pension and occupational risk contributions on 40% of what you bill. Javier pays 12.0% of what he bills."
    ]
  },
  "d-1": {
    "title": "Your rules in Chile",
    "time": "25 minutes",
    "purpose": "You leave with your rules for Chile on one page.",
    "intro": "Have at hand your contract, your finiquito (final settlement) and your latest pay slip. Write the amounts in pesos, in the same order as Rodrigo's example in Appendix D.",
    "trae": "Bring your contract, your finiquito and your latest pay slip.",
    "where": "Appendix D, Chile",
    "who": "Rodrigo",
    "summary": [
      "Severance for years of service is calculated on a base capped at 90 UF. It left Rodrigo CLP 39,105,000.",
      "In 2026, the boleta de honorarios withholds 15.25%, and that withholding pays your independent worker contributions first.",
      "If your contract bans dealings within the company's line of business, compare it with the line of business of the company that would hire you before you sign."
    ]
  },
  "cierre": {
    "code": "Closing",
    "title": "What to do on Monday",
    "time": "15 minutes",
    "purpose": "You leave with your level written down with the date and the template you'll fill in this week.",
    "intro": "The six steps from the book's closing, in the same order. Tick each one when you do it and write down what it asks for.",
    "where": "Closing of the book, What comes next",
    "who": "Carmen, Javier, Andrea and Rodrigo",
    "summary": [
      "Carmen and Andrea end at level 1, Javier at level 2 and Rodrigo at level 3.",
      "Each level has a condition for moving up to the next one and its templates in the workbook.",
      "On Monday you write your level and the date in the workbook, and pick this week's template."
    ]
  }
};
