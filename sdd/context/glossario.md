# Glossário

| Termo na tela (PT) | Campo / valor na API | Observação |
|---|---|---|
| Aluno | `user_type: "student"` | |
| Instrutor | `user_type: "instructor"` | |
| Masculino / Feminino | `sex: "male"` / `"female"` | |
| Academia | `Gym` | O usuário tem no máximo uma academia atual (`user.gym`) |
| Treino (de um dia) | `Workout` | No máximo um por aluno por dia |
| Nome do treino | `Workout.name` | ex.: "Peito e Bíceps" |
| Exercício / máquina | `Exercise.machine` | |
| Séries | `Exercise.sets` | texto livre, ex.: "4x10" |
| Dia da semana | `day_of_week` | `monday` … `sunday`; rótulos PT em `constants/days.ts` |
| Descanso | ausência de `Workout` no dia | não é um registro |
| Treine do seu jeito | `CustomWorkout` | descrição + foto opcional |
| Chamar instrutor | `POST /instructor-calls` | gera `Notification` para instrutores da academia |
| Notificação | `Notification` | |
| Especialidade | `User.specialty` | só para instrutor |
