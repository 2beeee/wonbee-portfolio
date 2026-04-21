export interface FlashcardItem {
  front: string;
  back: string;
  tag: string;
  tier: "S" | "A" | "B";
  workTitle: string;
}

export interface MeaningRow {
  term: string;
  meaning: string;
}

export interface Work {
  id: string;
  title: string;
  filename: string;
  author: string;
  tier: "S" | "A" | "B";
  scopeBadge: string;
  sourceBadge: string;
  scopeConfidence?: string;
  genre: string;
  character: string;
  subject: string;
  theme: string;
  speakerOrViewpoint: string;
  priorityReason: string;
  structureAnalysis?: string[];
  expressionFeatures?: string[];
  keyMeanings: MeaningRow[];
  authorConsciousness?: string[];
  teacherPoints: string[];
  traps?: string[];
  quickLine: string;
  note?: string;
  flashcards: FlashcardItem[];
}

export const examSummary = {
    "examDate":  "2026-04-22",
    "examTime":  "08:20-09:10",
    "scoreStructure":  "객관식 100 / 단답형 0 / 서논술형 0",
    "questionCount":  "자료 미기재",
    "scope":  [
                  "교과서 10~17, 26~32, 58~65, 160~204p",
                  "유인물 전부",
                  "3월 학력평가 \u003c자경\u003e 포함"
              ],
    "teacher":  "제공 자료 내 직접 표기 미발견",
    "publisher":  "자료 직접 표기 없음. 작품 배열·페이지 구조가 미래엔 공식 해설 PDF와 일치해 ㈜미래엔(대표저자 방민호)로 강하게 추정"
};

export const works: Work[] = [
    {
        "id":  "jagyeong",
        "title":  "자경",
        "filename":  "작품-S-01-자경.md",
        "author":  "박인로",
        "tier":  "S",
        "scopeBadge":  "유인물 / 3월 학평",
        "sourceBadge":  "실전 문제 + 필기",
        "scopeConfidence":  "범위 명시",
        "genre":  "연시조 3수",
        "character":  "교훈적 · 성찰적",
        "subject":  "유교 도덕 / 세태 / 경세제민",
        "theme":  "유교적 도덕 실천이 외면되는 세태를 비판하고, 뜻을 이루지 못한 자신을 경계한다.",
        "speakerOrViewpoint":  "화자 = 박인로 자신",
        "priorityReason":  "가정통신문에 3월 학평 \u003c자경\u003e이 명시되고, 실제 handout에 문제와 해설이 붙어 있다.",
        "structureAnalysis":  [
                                  "제1수: 명경 ↔ 명덕 대비로 겉만 닦고 속은 닦지 않는 세태 비판",
                                  "제2수: 성의관·팔덕문·큰 길의 비유로 올바른 길을 외면하는 현실 제시",
                                  "제3수: 제세주와 사공의 비유로 경세제민의 포부를 이루지 못한 자기 성찰"
                              ],
        "expressionFeatures":  [
                                   "추상적 가치를 명경·명덕·성의관·팔덕문·제세주·사공으로 비유",
                                   "대비를 통해 겉 닦기와 덕 닦기의 차이를 선명하게 드러냄",
                                   "연시조라 수별 역할 구분 문제가 잘 나온다"
                               ],
        "keyMeanings":  [
                            {
                                "term":  "명경",
                                "meaning":  "값 주고 닦는 깨끗한 거울. 사람들이 더 신경 쓰는 겉의 대상"
                            },
                            {
                                "term":  "명덕",
                                "meaning":  "진짜 닦아야 할 내면의 덕"
                            },
                            {
                                "term":  "성의관",
                                "meaning":  "뜻을 바르게 하는 군자의 마음가짐을 형상화한 관문"
                            },
                            {
                                "term":  "팔덕문",
                                "meaning":  "인의예지충신효제를 실천하는 문"
                            },
                            {
                                "term":  "제세주",
                                "meaning":  "세상을 건질 배. 경세제민의 포부"
                            },
                            {
                                "term":  "사공",
                                "meaning":  "그 포부를 이루지 못한 화자 자신"
                            }
                        ],
        "authorConsciousness":  [
                                    "남만 비판하지 않고 자기 자신도 함께 경계한다",
                                    "개인 수양과 사회 윤리를 연결한다",
                                    "제목 자체가 자기 경계의 태도를 압축한다"
                                ],
        "teacherPoints":  [
                              "handout에 작품 해제와 실제 3월 학평 문제가 붙어 있음",
                              "비유 대응만 정확히 맞추면 선지 절반은 제거 가능",
                              "제1수·제2수·제3수의 초점이 다르다"
                          ],
        "traps":  [
                      "명경을 화자 자신의 마음으로 읽으면 틀린다",
                      "제세주와 사공을 뒤집으면 틀린다",
                      "성의관·팔덕문을 실제 배경처럼 읽으면 틀린다"
                  ],
        "quickLine":  "연시조 / 자기 경계와 세태 비판 / 명경-명덕, 제세주-사공만 정확히",
        "flashcards":  [
                           {
                               "front":  "자경에서 명경 ↔ 명덕 대비가 뜻하는 바는?",
                               "back":  "사람들은 겉은 닦고 내면의 덕은 닦지 않는다는 세태 비판",
                               "tag":  "비유",
                               "tier":  "S",
                               "workTitle":  "자경"
                           },
                           {
                               "front":  "자경 3수의 제세주와 사공은 각각?",
                               "back":  "제세주=세상을 구하고 싶은 포부 / 사공=그 포부를 이루지 못한 화자 자신",
                               "tag":  "상징",
                               "tier":  "S",
                               "workTitle":  "자경"
                           },
                           {
                               "front":  "자경 제목의 핵심 뜻 한 줄",
                               "back":  "남보다 먼저 자신을 경계하는 작품",
                               "tag":  "주제",
                               "tier":  "S",
                               "workTitle":  "자경"
                           }
                       ]
    },
    {
        "id":  "dosan",
        "title":  "도산십이곡",
        "filename":  "작품-S-02-도산십이곡.md",
        "author":  "이황",
        "tier":  "S",
        "scopeBadge":  "유인물 / 필기 사진",
        "sourceBadge":  "수업 필기 반복",
        "scopeConfidence":  "유인물 범위",
        "genre":  "연시조 12수",
        "character":  "자연친화적 · 수양적",
        "subject":  "도산의 삶 / 자연 / 학문 수양",
        "theme":  "앞 6수에서는 자연 속 삶의 뜻을, 뒤 6수에서는 성현의 길과 학문 수양의 자세를 노래한다.",
        "speakerOrViewpoint":  "화자 = 이황 자신",
        "priorityReason":  "사진 3장 + PDF 1개가 전부 이 작품 필기다. 선생님 강조 밀도가 가장 높다.",
        "structureAnalysis":  [
                                  "제1~6곡 언지: 자연 속 삶, 자연 예찬, 연군의식",
                                  "제7~12곡 언학: 독서의 즐거움, 진리 탐구, 성현의 길, 자기반성, 꾸준한 수양",
                                  "제10곡은 벼슬살이 반성, 제11·12곡은 학문 정진 다짐"
                              ],
        "expressionFeatures":  [
                                   "설의법으로 뜻을 강조함",
                                   "대구법과 자연 이미지 병치로 운율과 의미를 동시에 만듦",
                                   "핵심 한자어가 상징 문제로 바로 연결됨"
                               ],
        "keyMeanings":  [
                            {
                                "term":  "천석고황",
                                "meaning":  "자연을 깊이 사랑하는 마음"
                            },
                            {
                                "term":  "피미일인",
                                "meaning":  "임금"
                            },
                            {
                                "term":  "교교백구",
                                "meaning":  "은둔한 선비 / 고결한 존재의 이미지"
                            },
                            {
                                "term":  "화만산·월만대",
                                "meaning":  "대자연의 아름다움"
                            },
                            {
                                "term":  "연비어약·운영천광",
                                "meaning":  "자연 질서의 무한함"
                            },
                            {
                                "term":  "만권생애",
                                "meaning":  "책 읽는 삶, 학문에 몰두하는 생애"
                            },
                            {
                                "term":  "만고상청",
                                "meaning":  "자연처럼 변치 않는 학문 수양의 자세"
                            }
                        ],
        "authorConsciousness":  [
                                    "자연 은거는 도피가 아니라 더 바른 삶을 위한 선택",
                                    "자연 속에서도 연군의식이 남아 있음",
                                    "후반부 핵심은 성현의 길을 따라 꾸준히 공부하겠다는 다짐"
                                ],
        "teacherPoints":  [
                              "사진 필기에서 언지/언학 구분과 핵심 한자어가 반복 정리됨",
                              "제4·5·10·11·12곡의 기능을 특히 자주 표시함",
                              "한자어 뜻을 정확히 연결하면 선지가 빨리 지워진다"
                          ],
        "traps":  [
                      "피미일인을 연인으로 보면 틀린다",
                      "교교백구를 단순 동물로 읽으면 틀린다",
                      "전반부를 전부 자연 예찬만으로 읽으면 후반부 학문 수양을 놓친다"
                  ],
        "quickLine":  "연시조 / 언지와 언학 / 피미일인·교교백구·만고상청",
        "flashcards":  [
                           {
                               "front":  "도산십이곡의 큰 구조는?",
                               "back":  "1~6곡 언지 / 7~12곡 언학",
                               "tag":  "구조",
                               "tier":  "S",
                               "workTitle":  "도산십이곡"
                           },
                           {
                               "front":  "피미일인은 누구인가?",
                               "back":  "임금",
                               "tag":  "상징",
                               "tier":  "S",
                               "workTitle":  "도산십이곡"
                           },
                           {
                               "front":  "만고상청의 시험용 의미",
                               "back":  "자연처럼 변치 않는 학문 수양의 자세",
                               "tag":  "한자어",
                               "tier":  "S",
                               "workTitle":  "도산십이곡"
                           }
                       ]
    },
    {
        "id":  "mujin",
        "title":  "무진기행",
        "filename":  "작품-S-03-무진기행.md",
        "author":  "김승옥",
        "tier":  "S",
        "scopeBadge":  "유인물 / 활동지",
        "sourceBadge":  "발췌 + 활동지 다수",
        "scopeConfidence":  "유인물 범위",
        "genre":  "현대소설",
        "character":  "심리적 · 상징적 · 비판적",
        "subject":  "무진 방문과 윤희중의 내면 동요",
        "theme":  "무진이라는 안개 낀 공간에서 자기기만과 현실 순응의 본모습이 드러난다.",
        "speakerOrViewpoint":  "1인칭 주인공 시점",
        "priorityReason":  "활동지 2장 + 발췌 handout 4쪽으로 가장 많은 문항 소재를 제공한다.",
        "structureAnalysis":  [
                                  "서울의 속물적 현실에 지친 윤희중이 무진으로 내려옴",
                                  "무진·안개·미친 여자·하인숙을 통해 과거와 욕망이 흔들림",
                                  "전보를 받은 뒤 현실 복귀를 택하며 무진을 떠남"
                              ],
        "expressionFeatures":  [
                                   "무진/안개/통금 사이렌/전보 같은 상징적 소재가 반복됨",
                                   "감각적 묘사와 내면 독백이 많아 인물 심리 추적형 문제가 잘 나옴",
                                   "인물 배치가 대비를 이룸: 윤희중-조-박-하인숙"
                               ],
        "keyMeanings":  [
                            {
                                "term":  "무진",
                                "meaning":  "도피처이자 자기 내면을 정면으로 보게 만드는 공간"
                            },
                            {
                                "term":  "안개",
                                "meaning":  "현실과의 단절, 혼란, 자기상실"
                            },
                            {
                                "term":  "하인숙",
                                "meaning":  "서울에 대한 욕망과 탈출 충동을 자극하는 매개"
                            },
                            {
                                "term":  "조",
                                "meaning":  "성공했지만 속물화된 현실 질서"
                            },
                            {
                                "term":  "박",
                                "meaning":  "선량하지만 무기력한 순수"
                            },
                            {
                                "term":  "통금 사이렌",
                                "meaning":  "모든 사고를 압도하는 현실 억압의 소리"
                            },
                            {
                                "term":  "전보",
                                "meaning":  "무진 체류를 끊고 서울 현실로 복귀시키는 장치"
                            }
                        ],
        "authorConsciousness":  [
                                    "무진은 치유의 공간이 아니라 주인공의 취약함을 드러내는 공간",
                                    "윤희중은 스스로를 성찰하지만 끝내 현실을 바꾸지 못함",
                                    "결말의 편지 찢기는 낭만보다 현실 순응이 강하다는 증거"
                                ],
        "teacherPoints":  [
                              "활동지에서 무진의 공간적 의미, 하인숙의 입장 변화, \u003c어떤 개인 날\u003e 의미 변화가 직접 질문으로 제시됨",
                              "하인숙·조·박을 윤희중의 욕망/현실/양심 축으로 묶어 읽으면 정리가 쉬움",
                              "결말은 해방이 아니라 타협안과 현실 복귀"
                          ],
        "traps":  [
                      "무진을 그냥 편안한 고향 공간으로 보면 틀린다",
                      "하인숙을 구원자로 보면 틀린다",
                      "마지막을 결단/해방으로 읽으면 틀린다"
                  ],
        "quickLine":  "현대소설 / 무진·안개·전보 상징 / 결말은 현실 복귀",
        "flashcards":  [
                           {
                               "front":  "무진의 핵심 공간 의미 2개",
                               "back":  "도피처 + 자기 내면을 직면하게 하는 공간",
                               "tag":  "공간",
                               "tier":  "S",
                               "workTitle":  "무진기행"
                           },
                           {
                               "front":  "무진기행의 전보가 하는 일",
                               "back":  "무진 체류를 끊고 윤희중을 서울 현실로 되돌린다",
                               "tag":  "소재 기능",
                               "tier":  "S",
                               "workTitle":  "무진기행"
                           },
                           {
                               "front":  "편지 찢기의 뜻",
                               "back":  "하인숙과의 탈출보다 현실 순응을 선택했다는 뜻",
                               "tag":  "결말",
                               "tier":  "S",
                               "workTitle":  "무진기행"
                           }
                       ]
    },
    {
        "id":  "nuhangsa",
        "title":  "누항사",
        "filename":  "작품-A-01-누항사.md",
        "author":  "박인로",
        "tier":  "A",
        "scopeBadge":  "유인물 + 교과서 비교",
        "sourceBadge":  "손필기 유인물",
        "scopeConfidence":  "유인물 범위 추정",
        "genre":  "가사",
        "character":  "현실적 · 의지적",
        "subject":  "가난한 현실과 안빈 의지",
        "theme":  "궁핍한 현실을 드러내면서도 뜻을 굽히지 않는 삶의 태도를 보인다.",
        "speakerOrViewpoint":  "가사 화자",
        "priorityReason":  "교과서 비교 작품인데도 별도 handout 2쪽이 있어 출제 가능성이 올라간다.",
        "keyMeanings":  [
                            {
                                "term":  "누항",
                                "meaning":  "누추한 골목. 가난한 현실 공간"
                            },
                            {
                                "term":  "소 빌리기 장면",
                                "meaning":  "궁핍의 현실성과 자존심 상처를 드러내는 장면"
                            },
                            {
                                "term":  "명월청풍",
                                "meaning":  "현실 고통을 넘어서 자연 속 삶을 지향하는 마음"
                            }
                        ],
        "teacherPoints":  [
                              "안빈낙도만 외우면 부족하다. 가난의 구체성이 먼저 나온다.",
                              "현실 고통 + 지조 유지가 함께 잡혀야 정답이 잘 맞는다."
                          ],
        "quickLine":  "가사 / 궁핍한 현실 속에서도 뜻을 굽히지 않으려는 삶 / 핵심은 가난의 구체성 + 지조",
        "flashcards":  [
                           {
                               "front":  "누항사의 시험 핵심",
                               "back":  "가난한 현실을 구체적으로 드러내면서도 뜻을 굽히지 않는다",
                               "tag":  "주제",
                               "tier":  "A",
                               "workTitle":  "누항사"
                           }
                       ]
    },
    {
        "id":  "maeum-dal",
        "title":  "마음의 달",
        "filename":  "작품-A-02-마음의달.md",
        "author":  "천양희",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "교과서 활동",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "현대시",
        "character":  "따뜻함 · 위로",
        "subject":  "상처와 치유",
        "theme":  "상처를 겪은 사람의 마음을 달의 이미지로 위로한다.",
        "speakerOrViewpoint":  "시적 화자",
        "priorityReason":  "첫 단원 대표 작품. OX·상징·역설 문제가 교과서에 직접 정리돼 있다.",
        "keyMeanings":  [
                            {
                                "term":  "가시나무 울타리",
                                "meaning":  "시련과 아픔을 주는 존재"
                            },
                            {
                                "term":  "꺾이다",
                                "meaning":  "오히려 보름으로 향하는 긍정적 역설"
                            },
                            {
                                "term":  "보름달",
                                "meaning":  "회복된 마음"
                            }
                        ],
        "teacherPoints":  [
                              "밝은 시어 vs 어두운 시어의 대비를 먼저 본다.",
                              "꺾어지는 것은 무릎이 아니라 마음이라는 역설을 기억한다."
                          ],
        "quickLine":  "현대시 / 상처 입은 마음의 치유와 위로 / 가시나무 울타리와 꺾이다의 역설",
        "flashcards":  [
                           {
                               "front":  "마음의 달에서 가시나무 울타리의 의미",
                               "back":  "시련·상처를 주는 현실",
                               "tag":  "상징",
                               "tier":  "A",
                               "workTitle":  "마음의 달"
                           }
                       ]
    },
    {
        "id":  "flower-yuksaa",
        "title":  "꽃",
        "filename":  "작품-A-03-꽃.md",
        "author":  "이육사",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "교과서 활동",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "현대시",
        "character":  "저항적 · 희망적",
        "subject":  "암울한 현실 속 희망",
        "theme":  "일제 강점기의 절망 속에서도 광복의 희망과 극복 의지를 노래한다.",
        "speakerOrViewpoint":  "시적 화자",
        "priorityReason":  "작가 맥락 문제가 교과서 답지에 직접 정리된 대표 저항시다.",
        "keyMeanings":  [
                            {
                                "term":  "꽃",
                                "meaning":  "광복과 미래에 대한 희망"
                            },
                            {
                                "term":  "꽃 맹아리",
                                "meaning":  "눈 속에 숨은 미래의 가능성"
                            },
                            {
                                "term":  "제비 떼 / 꽃성",
                                "meaning":  "희망찬 미래의 조국"
                            }
                        ],
        "teacherPoints":  [
                              "이육사 = 독립운동가라는 작가 맥락을 붙여 읽는다.",
                              "대립적 이미지 속에서도 결론은 희망 쪽이다."
                          ],
        "quickLine":  "현대시 / 저항과 희망 / 꽃과 꽃 맹아리를 광복의 기운으로 읽기",
        "flashcards":  [
                           {
                               "front":  "이육사 \u003c꽃\u003e의 꽃 = ?",
                               "back":  "광복과 미래의 조국에 대한 희망",
                               "tag":  "상징",
                               "tier":  "A",
                               "workTitle":  "꽃"
                           }
                       ]
    },
    {
        "id":  "iokseol",
        "title":  "이옥설",
        "filename":  "작품-A-04-이옥설.md",
        "author":  "이규보",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "교과서 활동",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "고전 수필 / 교술",
        "character":  "교훈적 · 논리적",
        "subject":  "행랑채 수리에서 얻은 깨달음",
        "theme":  "잘못은 초기에 바로잡아야 하며, 이는 개인과 나라의 정치에 모두 적용된다.",
        "speakerOrViewpoint":  "글쓴이 자신",
        "priorityReason":  "내용 전개, 대조, 유추가 답지에 도식으로 정리돼 있어 객관식 재료가 많다.",
        "keyMeanings":  [
                            {
                                "term":  "썩은 재목",
                                "meaning":  "오래 방치한 잘못"
                            },
                            {
                                "term":  "온전한 재목",
                                "meaning":  "빨리 고치면 회복 가능한 상태"
                            },
                            {
                                "term":  "나라의 정치",
                                "meaning":  "개인의 잘못 교정 원리를 확장 적용한 대상"
                            }
                        ],
        "teacherPoints":  [
                              "1문단 경험 → 2·3문단 교훈 구조를 구분한다.",
                              "표현상 특징은 대조 + 유추가 핵심이다."
                          ],
        "quickLine":  "교술 갈래 / 행랑채 수리 경험에서 교훈 도출 / 대조+유추만 기억",
        "flashcards":  [
                           {
                               "front":  "이옥설 표현법 2개",
                               "back":  "대조, 유추",
                               "tag":  "표현",
                               "tier":  "A",
                               "workTitle":  "이옥설"
                           }
                       ]
    },
    {
        "id":  "changiparangga",
        "title":  "찬기파랑가",
        "filename":  "작품-A-05-찬기파랑가.md",
        "author":  "충담사",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "교과서 활동",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "향가(10구체 사뇌가)",
        "character":  "추모적 · 예찬적",
        "subject":  "기파랑의 고매한 인품",
        "theme":  "기파랑을 추모하고 예찬하며 그 인품을 본받고 싶어 한다.",
        "speakerOrViewpoint":  "승려 화자",
        "priorityReason":  "향찰·10구체·아야·상징 시어가 모두 객관식 재료다.",
        "keyMeanings":  [
                            {
                                "term":  "달",
                                "meaning":  "기파랑의 숭고한 인품"
                            },
                            {
                                "term":  "잣나무 가지",
                                "meaning":  "높고 굳센 절개와 기품"
                            },
                            {
                                "term":  "눈",
                                "meaning":  "고결함을 덮지 못할 만큼 높은 인품"
                            }
                        ],
        "teacherPoints":  [
                              "향찰, 10구체, 낙구 감탄사 아야를 묶어 외운다.",
                              "시상 전개: 추모 → 본받고자 함 → 예찬"
                          ],
        "quickLine":  "향가 / 기파랑 추모·예찬 / 향찰·10구체·아야·잣나무 가지",
        "flashcards":  [
                           {
                               "front":  "찬기파랑가의 문학사 핵심 2개",
                               "back":  "향찰 표기, 10구체 향가(사뇌가)",
                               "tag":  "갈래",
                               "tier":  "A",
                               "workTitle":  "찬기파랑가"
                           }
                       ]
    },
    {
        "id":  "seogyeongbyeolgok",
        "title":  "서경별곡",
        "filename":  "작품-A-06-서경별곡.md",
        "author":  "작자 미상",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "교과서 활동",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "고려 속요",
        "character":  "직설적 · 적극적",
        "subject":  "이별의 슬픔과 변함없는 사랑",
        "theme":  "이별을 거부하고 임에 대한 사랑과 원망을 솔직하게 드러낸다.",
        "speakerOrViewpoint":  "여성 화자로 추정",
        "priorityReason":  "후렴구·연장체·3음보·여성 화자 추정이 세트로 나온다.",
        "keyMeanings":  [
                            {
                                "term":  "후렴구",
                                "meaning":  "운율 형성, 흥 돋움, 반복 강조"
                            },
                            {
                                "term":  "긴힛끈",
                                "meaning":  "끊어지지 않는 화자의 사랑"
                            },
                            {
                                "term":  "사공",
                                "meaning":  "임을 데려가는 존재라서 후반부 원망의 대상"
                            }
                        ],
        "teacherPoints":  [
                              "연장체 + 후렴구 + 대체로 3음보를 한 묶음으로 기억한다.",
                              "후반부는 사공을 원망하며 임을 믿지 못하는 마음이 섞인다."
                          ],
        "quickLine":  "고려 속요 / 이별 거부와 적극적 사랑 / 후렴구·3음보·사공 원망",
        "flashcards":  [
                           {
                               "front":  "서경별곡 형식 키워드 3개",
                               "back":  "연장체, 후렴구, 대체로 3음보",
                               "tag":  "형식",
                               "tier":  "A",
                               "workTitle":  "서경별곡"
                           }
                       ]
    },
    {
        "id":  "sijo-ihwa",
        "title":  "이화에 월백하고",
        "filename":  "작품-A-07-이화에월백하고.md",
        "author":  "이조년",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "시조 세 편",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "평시조",
        "character":  "애상적",
        "subject":  "봄밤의 그리움",
        "theme":  "봄밤의 정취 속에서 잠 못 이루는 화자의 애상적 정서를 드러낸다.",
        "speakerOrViewpoint":  "시조 화자",
        "priorityReason":  "시각적 이미지, 계절 배경, 정서 파악이 쉽고 자주 묻는 유형이다.",
        "keyMeanings":  [
                            {
                                "term":  "이화·월백·은한",
                                "meaning":  "시각적이고 밝은 봄밤의 배경"
                            },
                            {
                                "term":  "자규",
                                "meaning":  "화자의 외로운 정서를 자극하는 존재"
                            },
                            {
                                "term":  "잠 못 듦",
                                "meaning":  "다정한 마음 때문에 생긴 애상"
                            }
                        ],
        "teacherPoints":  [
                              "봄밤 배경 + 잠 못 드는 상황 + 애상 정서 3개만 묶어 기억한다."
                          ],
        "quickLine":  "평시조 / 봄밤 애상 / 시각적 이미지가 핵심",
        "flashcards":  [
                           {
                               "front":  "이화에 월백하고의 정서 한 단어",
                               "back":  "애상",
                               "tag":  "정서",
                               "tier":  "A",
                               "workTitle":  "이화에 월백하고"
                           }
                       ]
    },
    {
        "id":  "sijo-suyangsan",
        "title":  "수양산 바라보며",
        "filename":  "작품-A-08-수양산바라보며.md",
        "author":  "성삼문",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "시조 세 편",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "평시조",
        "character":  "비장적 · 절의적",
        "subject":  "단종에 대한 충절",
        "theme":  "역사적 인물을 끌어와 굳은 절의와 지조를 드러낸다.",
        "speakerOrViewpoint":  "시조 화자",
        "priorityReason":  "사육신 맥락 + 수양산/이제의 중의성이 직접 출제 포인트다.",
        "keyMeanings":  [
                            {
                                "term":  "수양산",
                                "meaning":  "백이·숙제의 산이면서 수양대군을 빗댄 대상"
                            },
                            {
                                "term":  "이제",
                                "meaning":  "절의를 대표하는 백이·숙제"
                            },
                            {
                                "term":  "채미",
                                "meaning":  "절의를 지키는 태도"
                            }
                        ],
        "teacherPoints":  [
                              "작가가 사육신이라는 역사 맥락을 붙여 읽어야 한다."
                          ],
        "quickLine":  "평시조 / 절의와 지조 / 수양산·이제의 중의성 필수",
        "flashcards":  [
                           {
                               "front":  "수양산 바라보며의 수양산을 왜 중의적으로 보나?",
                               "back":  "백이·숙제의 고사와 수양대군을 동시에 떠올리게 하기 때문",
                               "tag":  "맥락",
                               "tier":  "A",
                               "workTitle":  "수양산 바라보며"
                           }
                       ]
    },
    {
        "id":  "sijo-eojyeo",
        "title":  "어져 내 일이야",
        "filename":  "작품-A-09-어져내일이야.md",
        "author":  "황진이",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "시조 세 편",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "평시조",
        "character":  "연정적 · 갈등적",
        "subject":  "임을 보내고 난 뒤의 그리움",
        "theme":  "보내고 난 뒤에 더 커진 연정과 후회의 정서를 드러낸다.",
        "speakerOrViewpoint":  "여성 화자",
        "priorityReason":  "종장의 갈등(자존심 vs 연정) 정리가 답지에 직접 나온다.",
        "keyMeanings":  [
                            {
                                "term":  "어져",
                                "meaning":  "안타까움과 탄식"
                            },
                            {
                                "term":  "보내고 그리운 정",
                                "meaning":  "스스로도 어찌할 수 없는 연정"
                            },
                            {
                                "term":  "의문형 진술",
                                "meaning":  "정서를 효과적으로 드러내는 방식"
                            }
                        ],
        "teacherPoints":  [
                              "보내고 난 뒤 생긴 정이라는 역설을 잡으면 된다."
                          ],
        "quickLine":  "평시조 / 임을 보낸 뒤 커지는 연정 / 종장의 갈등과 후회",
        "flashcards":  [
                           {
                               "front":  "어져 내 일이야의 핵심 정서",
                               "back":  "임을 보낸 뒤 더 짙어진 그리움과 후회",
                               "tag":  "정서",
                               "tier":  "A",
                               "workTitle":  "어져 내 일이야"
                           }
                       ]
    },
    {
        "id":  "sangchunggok",
        "title":  "상춘곡",
        "filename":  "작품-A-10-상춘곡.md",
        "author":  "정극인",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "교과서 활동",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "가사",
        "character":  "풍류적 · 자연친화적",
        "subject":  "봄 경치와 안빈낙도",
        "theme":  "자연 속에서 풍류를 즐기며 사는 삶의 즐거움을 노래한다.",
        "speakerOrViewpoint":  "가사 화자",
        "priorityReason":  "서사-본사-결사, 4음보 연속체, 이동에 따른 시상 전개가 핵심 정리 포인트다.",
        "keyMeanings":  [
                            {
                                "term":  "홍진",
                                "meaning":  "속세"
                            },
                            {
                                "term":  "풍월 주인",
                                "meaning":  "자연 속에서 풍류를 누리는 자의 자부심"
                            },
                            {
                                "term":  "봉두",
                                "meaning":  "높은 곳에서 경치를 조망하는 공간"
                            }
                        ],
        "teacherPoints":  [
                              "정격 가사: 4음보 연속체 + 마지막 행이 시조 종장 닮음",
                              "초가집→시비와 정자→시냇가→봉두 순 공간 이동을 묻기 쉽다."
                          ],
        "quickLine":  "가사 / 봄 자연 속 풍류와 안빈낙도 / 4음보 연속체 + 공간 이동",
        "flashcards":  [
                           {
                               "front":  "상춘곡 형식 핵심",
                               "back":  "4음보 연속체의 정격 가사",
                               "tag":  "갈래",
                               "tier":  "A",
                               "workTitle":  "상춘곡"
                           }
                       ]
    },
    {
        "id":  "manboksa",
        "title":  "만복사저포기",
        "filename":  "작품-A-11-만복사저포기.md",
        "author":  "김시습",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "교과서 활동",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "고전소설 / 전기소설",
        "character":  "환상적 · 애정적",
        "subject":  "생사를 초월한 사랑",
        "theme":  "비현실적 사건을 통해 남녀의 사랑과 이별을 그린다.",
        "speakerOrViewpoint":  "전지적 서술 전개",
        "priorityReason":  "전기성 + 실제 지명/역사 사실 + 삽입시가 교과서 답지에 한 번에 정리돼 있다.",
        "keyMeanings":  [
                            {
                                "term":  "저포 놀이",
                                "meaning":  "양생이 인연을 얻기 위해 부처와 벌인 내기"
                            },
                            {
                                "term":  "남원·만복사",
                                "meaning":  "실제 지명이라 사실감을 준다"
                            },
                            {
                                "term":  "삽입시",
                                "meaning":  "인물 심정·분위기·사건 전개 암시"
                            }
                        ],
        "teacherPoints":  [
                              "전기소설 = 기이한 일 + 환상성 + 사실감의 결합",
                              "양생이 여인이 죽은 존재임을 알게 되는 순간이 절정이다."
                          ],
        "quickLine":  "전기소설 / 환상성과 사실성의 결합 / 저포 놀이·삽입시가 핵심",
        "flashcards":  [
                           {
                               "front":  "만복사저포기의 전기적 요소 1개",
                               "back":  "죽은 여인과 생사를 초월해 사랑함 / 공중의 목소리 등",
                               "tag":  "갈래",
                               "tier":  "A",
                               "workTitle":  "만복사저포기"
                           }
                       ]
    },
    {
        "id":  "heungboga",
        "title":  "흥보가",
        "filename":  "작품-A-12-흥보가.md",
        "author":  "작자 미상",
        "tier":  "A",
        "scopeBadge":  "교과서 메인",
        "sourceBadge":  "교과서 활동",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "판소리",
        "character":  "해학적 · 풍자적",
        "subject":  "궁핍한 흥보의 매품팔이",
        "theme":  "조선 후기 궁핍한 양반과 신분 질서의 약화를 해학과 풍자로 드러낸다.",
        "speakerOrViewpoint":  "판소리 창자/아니리 전개",
        "priorityReason":  "아니리·창·장단 차이와 사회상 문제가 교과서에 직접 나온다.",
        "keyMeanings":  [
                            {
                                "term":  "아니리",
                                "meaning":  "장단 없이 말하듯 이어 가는 사설"
                            },
                            {
                                "term":  "자진모리",
                                "meaning":  "빠른 장단. 흥보의 남루한 행색을 생동감 있게 전달"
                            },
                            {
                                "term":  "진양조",
                                "meaning":  "느린 장단. 흥보 아내의 만류와 슬픔을 길게 부각"
                            },
                            {
                                "term":  "매품팔이",
                                "meaning":  "화폐경제 중시·신분 질서 약화·부패한 사회"
                            }
                        ],
        "teacherPoints":  [
                              "판소리 = 창 + 아니리 조합",
                              "조선 후기 사회상 3개: 궁핍한 양반 / 화폐경제 / 신분 질서 약화"
                          ],
        "quickLine":  "판소리 / 해학과 풍자로 드러난 조선 후기 사회상 / 아니리·장단 차이 필수",
        "flashcards":  [
                           {
                               "front":  "흥보가의 사회상 3개",
                               "back":  "궁핍한 양반, 신분 질서 약화, 화폐 경제 중시",
                               "tag":  "사회상",
                               "tier":  "A",
                               "workTitle":  "흥보가"
                           }
                       ]
    },
    {
        "id":  "memil",
        "title":  "메밀꽃 필 무렵",
        "filename":  "작품-B-01-메밀꽃필무렵.md",
        "author":  "이효석",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "현대소설(부분)",
        "character":  "비교 작품",
        "subject":  "흐붓한 달빛",
        "theme":  "달빛과 메밀꽃이 만드는 서정적 분위기",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "현대소설(부분) / 달빛과 메밀꽃이 만드는 서정적 분위기 / 핵심: 흐붓한 달빛",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "dalbam",
        "title":  "달밤",
        "filename":  "작품-B-02-달밤.md",
        "author":  "이태준",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "현대소설",
        "character":  "비교 작품",
        "subject":  "1인칭 관찰자 시점",
        "theme":  "황수건을 향한 연민과 서정적 분위기",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "현대소설 / 황수건을 향한 연민과 서정적 분위기 / 핵심: 1인칭 관찰자 시점",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "son",
        "title":  "그 사람의 손을 보면",
        "filename":  "작품-B-03-그사람의손을보면.md",
        "author":  "천양희",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "현대시",
        "character":  "비교 작품",
        "subject":  "성자 비유",
        "theme":  "성실한 노동의 아름다움",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "현대시 / 성실한 노동의 아름다움 / 핵심: 성자 비유",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "nakhwa",
        "title":  "낙화",
        "filename":  "작품-B-04-낙화.md",
        "author":  "조지훈",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "현대시",
        "character":  "비교 작품",
        "subject":  "꽃 지는 아침",
        "theme":  "꽃이 지는 순간의 비애와 덧없음",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "현대시 / 꽃이 지는 순간의 비애와 덧없음 / 핵심: 꽃 지는 아침",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "mulbangul",
        "title":  "물방울처럼, 유리처럼",
        "filename":  "작품-B-05-물방울처럼,유리처럼.md",
        "author":  "김연수",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "현대 수필",
        "character":  "비교 작품",
        "subject":  "바다는 비에 젖지 않는다",
        "theme":  "삶의 통찰로 다시 버티는 태도",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "현대 수필 / 삶의 통찰로 다시 버티는 태도 / 핵심: 바다는 비에 젖지 않는다",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "seulgyeonseol",
        "title":  "슬견설",
        "filename":  "작품-B-06-슬견설.md",
        "author":  "이규보",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "고전 수필",
        "character":  "비교 작품",
        "subject":  "손과 나의 대조",
        "theme":  "모든 생명의 귀함을 깨닫게 함",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "고전 수필 / 모든 생명의 귀함을 깨닫게 함 / 핵심: 손과 나의 대조",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "musoyu",
        "title":  "무소유",
        "filename":  "작품-B-07-무소유.md",
        "author":  "법정",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "수필",
        "character":  "비교 작품",
        "subject":  "역설",
        "theme":  "버림으로 얻는 자유",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "수필 / 버림으로 얻는 자유 / 핵심: 역설",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "heonhwaga",
        "title":  "헌화가",
        "filename":  "작품-B-08-헌화가.md",
        "author":  "견우 노옹 지음·김완진 해독",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "향가 4구체",
        "character":  "비교 작품",
        "subject":  "꽃을 꺾어 바침",
        "theme":  "아름다움을 향한 헌신적 마음",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "향가 4구체 / 아름다움을 향한 헌신적 마음 / 핵심: 꽃을 꺾어 바침",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "cheoyongga",
        "title":  "처용가",
        "filename":  "작품-B-09-처용가.md",
        "author":  "처용 지음·김완진 해독",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "향가 8구체",
        "character":  "비교 작품",
        "subject":  "다리 넷",
        "theme":  "빼앗긴 현실을 받아들이는 너른 태도",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "향가 8구체 / 빼앗긴 현실을 받아들이는 너른 태도 / 핵심: 다리 넷",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "sesangi",
        "title":  "세상이 버리거늘",
        "filename":  "작품-B-10-세상이버리거늘.md",
        "author":  "윤이후",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "시조",
        "character":  "비교 작품",
        "subject":  "감탄구 비교",
        "theme":  "부귀공명 버리고 자연 속 삶 지향",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "시조 / 부귀공명 버리고 자연 속 삶 지향 / 핵심: 감탄구 비교",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "jemangmaega",
        "title":  "제망매가",
        "filename":  "작품-B-11-제망매가.md",
        "author":  "월명사",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "향가 10구체",
        "character":  "비교 작품",
        "subject":  "아아",
        "theme":  "누이를 잃은 슬픔의 종교적 승화",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "향가 10구체 / 누이를 잃은 슬픔의 종교적 승화 / 핵심: 아아",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "chuyaujung",
        "title":  "추야우중",
        "filename":  "작품-B-12-추야우중.md",
        "author":  "최치원",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "한시",
        "character":  "비교 작품",
        "subject":  "오언 절구",
        "theme":  "알아주는 이 없는 답답함",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "한시 / 알아주는 이 없는 답답함 / 핵심: 오언 절구",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "jeongseokga",
        "title":  "정석가",
        "filename":  "작품-B-13-정석가.md",
        "author":  "작자 미상",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "고려 속요",
        "character":  "비교 작품",
        "subject":  "서경별곡과 겹치는 구절",
        "theme":  "변함없는 사랑과 기원",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "고려 속요 / 변함없는 사랑과 기원 / 핵심: 서경별곡과 겹치는 구절",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "songin",
        "title":  "송인",
        "filename":  "작품-B-14-송인.md",
        "author":  "정지상",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "한시",
        "character":  "비교 작품",
        "subject":  "대동강 물",
        "theme":  "대동강 변 이별의 슬픔",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "한시 / 대동강 변 이별의 슬픔 / 핵심: 대동강 물",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "hallimbyeolgok",
        "title":  "한림별곡",
        "filename":  "작품-B-15-한림별곡.md",
        "author":  "한림 제유",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "경기체가",
        "character":  "비교 작품",
        "subject":  "결구 위~경 긔 엇더하니잇고",
        "theme":  "신흥 사대부의 자부심",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "경기체가 / 신흥 사대부의 자부심 / 핵심: 결구 위~경 긔 엇더하니잇고",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "gongbangjeon",
        "title":  "공방전",
        "filename":  "작품-B-16-공방전.md",
        "author":  "임춘",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "가전",
        "character":  "비교 작품",
        "subject":  "공방=엽전",
        "theme":  "돈 의인화로 세태 풍자",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "가전 / 돈 의인화로 세태 풍자 / 핵심: 공방=엽전",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "changnaegoja",
        "title":  "창 내고쟈",
        "filename":  "작품-B-17-창내고쟈.md",
        "author":  "작자 미상",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "사설시조",
        "character":  "비교 작품",
        "subject":  "과장·연쇄",
        "theme":  "답답함 해소 욕망을 해학적으로 표출",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "사설시조 / 답답함 해소 욕망을 해학적으로 표출 / 핵심: 과장·연쇄",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "igae-sijo",
        "title":  "이개의 시조",
        "filename":  "작품-B-18-이개의시조.md",
        "author":  "이개",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "시조",
        "character":  "비교 작품",
        "subject":  "촛불 이입",
        "theme":  "단종을 향한 애절한 충정",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "시조 / 단종을 향한 애절한 충정 / 핵심: 촛불 이입",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "hongrang-sijo",
        "title":  "홍랑의 시조",
        "filename":  "작품-B-19-홍랑의시조.md",
        "author":  "홍랑",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "시조",
        "character":  "비교 작품",
        "subject":  "묏버들=화자의 분신",
        "theme":  "임을 향한 애타는 그리움",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "시조 / 임을 향한 애타는 그리움 / 핵심: 묏버들=화자의 분신",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "gwandongbyeolgok",
        "title":  "관동별곡",
        "filename":  "작품-B-20-관동별곡.md",
        "author":  "정철",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "가사",
        "character":  "비교 작품",
        "subject":  "직유·대구",
        "theme":  "관동팔경의 아름다움과 연군·애민",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "가사 / 관동팔경의 아름다움과 연군·애민 / 핵심: 직유·대구",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "gyuwonga",
        "title":  "규원가",
        "filename":  "작품-B-21-규원가.md",
        "author":  "허난설헌",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "규방 가사",
        "character":  "비교 작품",
        "subject":  "사계절 자연물",
        "theme":  "가부장제 속 여성의 원망",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "규방 가사 / 가부장제 속 여성의 원망 / 핵심: 사계절 자연물",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "sodaeseongjeon",
        "title":  "소대성전",
        "filename":  "작품-B-22-소대성전.md",
        "author":  "작자 미상",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "한글 소설",
        "character":  "비교 작품",
        "subject":  "자객 장면",
        "theme":  "영웅적 면모와 한글소설의 대중성",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "한글 소설 / 영웅적 면모와 한글소설의 대중성 / 핵심: 자객 장면",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "isaenggyujangjeon",
        "title":  "이생규장전",
        "filename":  "작품-B-23-이생규장전.md",
        "author":  "김시습",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "한문 소설",
        "character":  "비교 작품",
        "subject":  "자유연애 사상",
        "theme":  "생사를 초월한 사랑",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "한문 소설 / 생사를 초월한 사랑 / 핵심: 자유연애 사상",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "choecheokjeon",
        "title":  "최척전",
        "filename":  "작품-B-24-최척전.md",
        "author":  "조위한",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "고전소설",
        "character":  "비교 작품",
        "subject":  "전쟁 현실",
        "theme":  "전쟁 속 혼란한 사회와 이산",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "고전소설 / 전쟁 속 혼란한 사회와 이산 / 핵심: 전쟁 현실",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "yangbanjeon",
        "title":  "양반전",
        "filename":  "작품-B-25-양반전.md",
        "author":  "박지원",
        "tier":  "B",
        "scopeBadge":  "교과서 비교 / 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "교과서 범위 명시",
        "genre":  "한문 소설",
        "character":  "비교 작품",
        "subject":  "양반 문서",
        "theme":  "양반 신분을 풍자",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "한문 소설 / 양반 신분을 풍자 / 핵심: 양반 문서",
        "note":  "",
        "flashcards":  [

                       ]
    },
    {
        "id":  "wall-egg",
        "title":  "벽과 알",
        "filename":  "작품-B-26-벽과알.md",
        "author":  "무라카미 하루키",
        "tier":  "B",
        "scopeBadge":  "유인물 보조",
        "sourceBadge":  "보조 읽기",
        "scopeConfidence":  "유인물 범위 추정",
        "genre":  "연설 / 에세이",
        "character":  "비교 작품",
        "subject":  "알 편에 선다",
        "theme":  "시스템보다 개인의 영혼 편에 서는 태도",
        "speakerOrViewpoint":  "보조 작품",
        "priorityReason":  "이번 시험에서는 작품명-주제-핵심 장치 1개만 기억하면 충분하다.",
        "keyMeanings":  [

                        ],
        "teacherPoints":  [

                          ],
        "quickLine":  "연설 / 에세이 / 시스템보다 개인의 영혼 편에 서는 태도 / 핵심: 알 편에 선다",
        "note":  "유인물 수록이라 범위 포함 가능성은 있으나 우선순위는 낮다.",
        "flashcards":  [

                       ]
    }
];
