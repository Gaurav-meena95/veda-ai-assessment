'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GeneratedPaper } from '@/types';

// Strict printable standard styles matching Delhi Public School exam papers
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    color: '#1A1A1A',
  },
  header: {
    paddingBottom: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1A1A1A',
    paddingVertical: 8,
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  instructions: {
    fontSize: 9,
    lineHeight: 1.4,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  studentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    paddingBottom: 8,
  },
  studentField: {
    flex: 1,
  },
  sectionHeader: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  sectionInstruction: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 2,
  },
  questionRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  questionNum: {
    fontWeight: 'bold',
    marginRight: 6,
  },
  questionText: {
    flex: 1,
  },
  endMarker: {
    textAlign: 'center',
    marginTop: 35,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  endText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  answerHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    paddingBottom: 5,
  },
  answerRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  answerNum: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  answerText: {
    flex: 1,
  }
});

interface PDFProps {
  paper: GeneratedPaper;
}

export const QuestionPaperPDF: React.FC<PDFProps> = ({ paper }) => {
  const { schoolHeader, timeAllowed, maxMarks, instructions, sections, answerKey } = paper;

  return (
    <Document>
      {/* PAGE 1: EXAM SHEET */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.schoolName}>{schoolHeader.schoolName || 'Delhi Public School, Sector-4, Bokaro'}</Text>
          <Text style={styles.subHeader}>SUBJECT: {schoolHeader.subject}</Text>
          <Text style={styles.subHeader}>CLASS: {schoolHeader.className}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text>TIME ALLOWED: {timeAllowed || '45 minutes'}</Text>
          <Text>MAXIMUM MARKS: {maxMarks}</Text>
        </View>

        <Text style={styles.instructions}>
          {instructions || 'All questions are compulsory unless stated otherwise.'}
        </Text>

        <View style={styles.studentInfo}>
          <Text style={styles.studentField}>Name: __________________________</Text>
          <Text style={styles.studentField}>Roll Number: ___________________</Text>
          <Text style={{ width: 150 }}>Class: {schoolHeader.className}   Section: _________</Text>
        </View>

        {sections.map((section, sIdx) => (
          <View key={sIdx} style={{ marginBottom: 15 }}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.questionType}</Text>
              {section.instruction && (
                <Text style={styles.sectionInstruction}>{section.instruction}</Text>
              )}
            </View>

            {section.questions.map((question, qIdx) => (
              <View key={qIdx} style={styles.questionRow}>
                <Text style={styles.questionNum}>{question.number}.</Text>
                <Text style={styles.questionText}>
                  [{question.difficulty}] {question.text} [{question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}]
                </Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.endMarker}>
          <Text style={styles.endText}>END OF QUESTION PAPER</Text>
        </View>
      </Page>

      {/* PAGE 2: ANSWER KEY */}
      {answerKey && answerKey.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.schoolName}>{schoolHeader.schoolName || 'Delhi Public School, Sector-4, Bokaro'}</Text>
            <Text style={styles.subHeader}>ANSWER KEY</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            {answerKey.map((item, idx) => (
              <View key={idx} style={styles.answerRow}>
                <Text style={styles.answerNum}>{item.number}.</Text>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            ))}
          </View>
        </Page>
      )}
    </Document>
  );
};

export default QuestionPaperPDF;
