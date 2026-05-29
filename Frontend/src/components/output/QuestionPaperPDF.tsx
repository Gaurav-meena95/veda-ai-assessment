'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GeneratedPaper } from '@/types';

// Strict printable standard styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#111111',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#111111',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subHeader: {
    fontSize: 10,
    color: '#4B5563',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 6,
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 15,
  },
  instructions: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 6,
    fontSize: 9,
    lineHeight: 1.4,
    color: '#4B5563',
    marginBottom: 15,
  },
  studentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 8,
    color: '#4B5563',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  sectionInstruction: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 2,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },
  questionText: {
    fontSize: 10,
    lineHeight: 1.4,
    flex: 1,
    paddingRight: 15,
  },
  questionMeta: {
    fontSize: 8,
    color: '#4B5563',
    width: 90,
    textAlign: 'right',
  },
  endMarker: {
    textAlign: 'center',
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  endText: {
    fontSize: 8,
    letterSpacing: 2,
    color: '#4B5563',
  },
  answerHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#111111',
    paddingBottom: 5,
  },
  answerRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },
  answerNum: {
    fontSize: 9,
    fontWeight: 'bold',
    width: 40,
    color: '#F97316',
  },
  answerText: {
    fontSize: 9,
    flex: 1,
    lineHeight: 1.4,
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
          <Text style={styles.schoolName}>{schoolHeader.schoolName}</Text>
          <Text style={styles.subHeader}>
            SUBJECT: {schoolHeader.subject}   |   CLASS: {schoolHeader.className}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text>TIME ALLOWED: {timeAllowed}</Text>
          <Text>MAXIMUM MARKS: {maxMarks}</Text>
        </View>

        <View style={styles.instructions}>
          <Text style={{ fontWeight: 'bold', color: '#111111', marginBottom: 2 }}>General Instructions:</Text>
          <Text>{instructions || 'All questions are compulsory unless stated otherwise.'}</Text>
        </View>

        <View style={styles.studentInfo}>
          <Text style={styles.studentField}>Name: ______________________</Text>
          <Text style={styles.studentField}>Roll Number: _______________</Text>
          <Text style={{ width: 120 }}>Section: __________</Text>
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
                <Text style={styles.questionText}>
                  {question.number}.  {question.text}
                </Text>
                <Text style={styles.questionMeta}>
                  [{question.difficulty}]  •  {question.marks}m
                </Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.endMarker}>
          <Text style={styles.endText}>--- END OF QUESTION PAPER ---</Text>
        </View>
      </Page>

      {/* PAGE 2: ANSWER KEY */}
      {answerKey && answerKey.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.schoolName}>{schoolHeader.schoolName}</Text>
            <Text style={styles.subHeader}>ANSWER KEY</Text>
          </View>

          <View style={{ marginTop: 15 }}>
            {answerKey.map((item, idx) => (
              <View key={idx} style={styles.answerRow}>
                <Text style={styles.answerNum}>Ans {item.number}.</Text>
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

