"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groqService = exports.generatePaper = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const env_1 = __importDefault(require("../config/env"));
let groq = null;
if (env_1.default.GROQ_API_KEY && !env_1.default.GROQ_API_KEY.includes('your-groq-key')) {
    groq = new groq_sdk_1.default({ apiKey: env_1.default.GROQ_API_KEY });
}
const generatePaper = async (data) => {
    const { questionTypes, additionalInfo, fileContent } = data;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sectionPrompts = questionTypes.map((qt, idx) => {
        const secLetter = alphabet[idx] || 'A';
        return `- Section ${secLetter}: ${qt.type} — ${qt.noOfQuestions} questions, ${qt.marks} marks each. Instruction: "Attempt all questions. Each question carries ${qt.marks} marks"`;
    }).join('\n');
    const totalMarks = questionTypes.reduce((acc, curr) => acc + (curr.noOfQuestions * curr.marks), 0);
    // Fallback helper to keep local evaluations robust if no API key is specified
    if (!groq) {
        console.log('[VedaAI GroqService] Groq API Key undefined. Generatng mock paper fallback.');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return generateMockPaper(questionTypes, additionalInfo, totalMarks);
    }
    try {
        const systemPrompt = "You are an expert teacher and exam paper creator. You MUST respond with ONLY valid JSON matching the exact schema requested. No markdown blocks, no explanation text, and no backticks.";
        const userPrompt = `Create a premium school question paper based on the following configurations:

SECTIONS TO GENERATE:
${sectionPrompts}

TOTAL MARKS: ${totalMarks}
${additionalInfo ? `ADDITIONAL INSTRUCTIONS:\n${additionalInfo}` : ''}
${fileContent ? `EXTRACTED CONTENT FOR CONTEXT:\n${fileContent}` : ''}

You MUST respond strictly in the following JSON format:
{
  "aiMessage": "A short, encouraging teacher statement of customized question details.",
  "schoolHeader": {
    "schoolName": "Harvard Public School",
    "subject": "English",
    "className": "5th"
  },
  "timeAllowed": "45 minutes",
  "maxMarks": ${totalMarks},
  "instructions": "All questions are compulsory unless stated otherwise.",
  "sections": [
    {
      "title": "Section A",
      "questionType": "Question Type Name",
      "instruction": "Section specific instructions",
      "questions": [
        {
          "number": 1,
          "text": "Detailed question text tailored to class and subject.",
          "difficulty": "Easy",
          "marks": 2
        }
      ]
    }
  ],
  "answerKey": [
    {
      "number": 1,
      "answer": "Detailed solution or answer key description for question 1."
    }
  ]
}`;
        const response = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.3,
        });
        let rawJson = response.choices[0]?.message?.content || '';
        // Prune markdown brackets if AI includes them
        if (rawJson.includes('```')) {
            rawJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim();
        }
        const parsed = JSON.parse(rawJson);
        // Validate structure schema bounds
        if (!parsed.sections || !Array.isArray(parsed.sections) || parsed.sections.length === 0) {
            throw new Error('Groq did not return valid exam sections.');
        }
        return parsed;
    }
    catch (error) {
        console.error('[VedaAI GroqService] Groq API execution failure:', error);
        throw error;
    }
};
exports.generatePaper = generatePaper;
const generateMockPaper = (questionTypes, additionalInfo, totalMarks) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sections = questionTypes.map((qt, sIdx) => {
        const secLetter = alphabet[sIdx] || 'A';
        const questions = Array.from({ length: qt.noOfQuestions }).map((_, qIdx) => {
            const qNum = qIdx + 1;
            let text = '';
            let difficulty = 'Easy';
            if (qIdx % 3 === 0) {
                difficulty = 'Easy';
            }
            else if (qIdx % 3 === 1) {
                difficulty = 'Moderate';
            }
            else {
                difficulty = 'Challenging';
            }
            if (qt.type.includes('MCQ')) {
                text = `Choose the correct option: Which word in the following sentence is an adjective? "The orange sun set slowly." \nOption A) orange \nOption B) sun \nOption C) set \nOption D) slowly`;
            }
            else if (qt.type.includes('Short')) {
                text = `Describe the difference between a simile and a metaphor. Give one example of each to substantiate your answer.`;
            }
            else if (qt.type.includes('Long') || qt.type.includes('Essay')) {
                text = `Write a letter to the principal of your school requesting an upgrade to the science laboratory. Outline three specific benefits of modern equipment.`;
            }
            else if (qt.type.includes('Diagram') || qt.type.includes('Graph')) {
                text = `Observe the descriptive passage provided. Construct a conceptual map displaying the relationships between the main noun and verb configurations.`;
            }
            else if (qt.type.includes('Numerical')) {
                text = `A reader consumes 240 words per minute. If a standard reading chapter consists of 1200 words, compute the minutes required to read the text.`;
            }
            else {
                text = `Write an essay discussing the role of storytelling in ancient cultures. Highlight at least two historical oral traditions.`;
            }
            return {
                number: qNum,
                text,
                difficulty,
                marks: qt.marks
            };
        });
        return {
            title: `Section ${secLetter}`,
            questionType: qt.type,
            instruction: `Attempt all questions in Section ${secLetter}. Each question carries ${qt.marks} ${qt.marks === 1 ? 'mark' : 'marks'}.`,
            questions
        };
    });
    const answerKey = [];
    let currentNum = 1;
    sections.forEach((sec) => {
        sec.questions.forEach((q) => {
            q.number = currentNum;
            answerKey.push({
                number: currentNum,
                answer: `Ideal answer for Q${currentNum} (${sec.questionType}): Students should demonstrate understanding of standard grammatical structures, formatting, and clear handwriting.`
            });
            currentNum++;
        });
    });
    return {
        aiMessage: "Certainly, John Doe! Here is the customized CBSE standard English exam paper created for your Grade 5 class, structured dynamically according to your requirements.",
        schoolHeader: {
            schoolName: "Harvard Public School",
            subject: "English",
            className: "5th"
        },
        timeAllowed: additionalInfo.toLowerCase().includes('hour') ? '3 hours' : '45 minutes',
        maxMarks: totalMarks,
        instructions: "All questions are compulsory. Ensure clean handwriting and double-check your section headings.",
        sections,
        answerKey
    };
};
exports.groqService = {
    generatePaper: exports.generatePaper,
};
exports.default = exports.groqService;
