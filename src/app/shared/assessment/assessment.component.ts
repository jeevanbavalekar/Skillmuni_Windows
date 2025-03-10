import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoneService } from 'src/app/services/zone.service';
import { Location } from '@angular/common';
import { QuestionItem, AnswerOption } from 'src/app/models/assessment.model';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  // Use the interface type instead of any
  questions: QuestionItem[] = [];
  briefCode: string = '';
  previousArticles: any[] = []; // Store previous articles
  submitted: boolean = false;
  score: number = 0;

  constructor(private route: ActivatedRoute, private zoneService: ZoneService, private location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.briefCode = params['brfcode'];
      this.title = params['title'] || 'Assessment';
      this.subtitle = params['subtitle'] || '';
  
      if (this.briefCode) {
        const storedData = sessionStorage.getItem(`assessment_${this.briefCode}`);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          this.questions = parsedData.questions;
          this.score = parsedData.score;
          this.submitted = parsedData.submitted;
        } else {
          this.fetchAssessment(this.briefCode);
        }
      }
    });
  }
  
  

  fetchAssessment(briefCode: string) {
    this.zoneService.getAssessmentData(briefCode).subscribe(
      (data: any) => { // ✅ Explicit type added
        console.log('Assessment API Response:', data);
  
        if (data.brief?.QTNLIST) {
          this.questions = data.brief.QTNLIST.map((item: any): QuestionItem => ({
            id: item.question.id_brief_question,  // ✅ Ensure `id` is mapped correctly
            text: item.question.brief_question,
            options: item.answers.map((ans: any): AnswerOption => ({
              id: ans.id_brief_answer, // ✅ Ensure answer ID is mapped correctly
              text: ans.brief_answer,
              isCorrect: ans.is_correct_answer
            })),
            selectedOption: ''
          }));
        }
      },
      (error: any) => { // ✅ Explicit type added
        console.error('Error fetching assessment:', error);
      }
    );
  }
  
  
  

  onBackClick() {
    this.location.back();
  }

  submitAnswers() {
    if (this.submitted) {
      this.location.back();
      return;
    }
  
    if (!this.isAllQuestionsAnswered()) {
      alert('Please answer all questions before submitting.');
      return;
    }
  
    this.submitted = true;
    this.score = 0;
    let formattedAnswers: string[] = [];
  
    this.questions.forEach(question => {
      const selectedOption = question.options.find(opt => opt.text === question.selectedOption);
      const correctOption = question.options.find(opt => opt.isCorrect === 1);
  
      if (selectedOption) {
        question.answerStatus = selectedOption.isCorrect === 1 ? 'correct' : 'wrong';
        if (selectedOption.isCorrect === 1) {
          this.score++;
        }
      } else {
        question.answerStatus = 'unanswered';
      }
  
      question.correctAnswer = correctOption ? correctOption.text : '';
  
      // ✅ Ensure `id` properties exist
      const questionId = question.id || 'unknownQID';
      const answerId = selectedOption?.id || 'unknownAID';
      formattedAnswers.push(`${questionId}|${answerId}|0`);
    });
  
    // ✅ Join answers into the required string format
    const ASRQString = formattedAnswers.join(';');
  
    // ✅ Set resultStatus (1 if submitted, 0 if not)
    const resultStatus = this.submitted ? 1 : 0;
  
    // ✅ Log values before API call (Including BRF)
    console.log("🔹 Preparing to submit assessment:");
    console.log("📌 BRF (Brief Code):", this.briefCode);
    console.log("📌 resultStatus:", resultStatus);
    console.log("📌 ASRQ Format:", ASRQString);
  
    // ✅ Send data to backend (Including BRF)
    this.zoneService.submitAssessment({
      brfcode: this.briefCode,  // ✅ BRF included in API call
      answers: ASRQString,
      resultStatus: resultStatus
    }).subscribe(
      (response: any) => {  
        console.log('✅ Assessment submitted successfully:', response);
      },
      (error: any) => {  
        console.error('❌ Error submitting assessment:', error);
      }
    );
  
    // ✅ Store results in sessionStorage
    const assessmentData = {
      questions: this.questions,
      score: this.score,
      submitted: this.submitted
    };
    sessionStorage.setItem(`assessment_${this.briefCode}`, JSON.stringify(assessmentData));
  
    console.log('📌 User answers stored:', this.questions);
    console.log('📌 Score stored:', this.score);
  
    // ✅ Scroll user to the top after submission
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }
  
  
  
  
  

  isAllQuestionsAnswered(): boolean {
    return this.questions.length > 0 && this.questions.every(question => question.selectedOption !== '');
  }
}
