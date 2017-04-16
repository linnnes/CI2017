### Cactus the SF Guide Bot

#### Instruction: Web-based chat-bot

We will put all the chatbots online for outsiders to see (and possibly score). Please update your best bot with the following:

- [x] Make your bot introduce itself. A user must be able to figure out what to say without looking at your source code. Do some user testing to see that users not familiar with your bot can actually figure out how to talk to it. You can use Recall and Precision measures to evaluate the success of your bot's performance.


### Chatbot Performance


- Chatbot performance (Predicted Condition): C.P.
- Ground Truth (Condition): G.T.



C.P.| G.T.|    Utterance     |
----|-----|------------------|
-|+| San Francisco |
+|+| What's new in San Francisco |
+|+| Search |
+|+| Look up San Fran |
+|+| What's around San Francisco  |
+|+| Who are you |
+|+| What are you |
+|+| hello |
-|+| Tell me about here   |
-|+| Show me here        |
+|-| Here   |
-|-| Search California    |
-|-| are you alive |
-|-| Search pasta  |
-|-| Give me some trending spots      |
-|-| Is Mau on the list  |
-|-| Where is whole foods |
-|-| Search Noe Valley         |
-|-| Search nopa   |
-|-| are you happy |

---

### Performance Metrics:

- `True Positive (TP)` = 7
- `False Positive (FP)` = 3
- `False Negative (FN)` = 1
- `True Negative (TN)` = 9
- `Accuracy (ACC) = (TP+TN) / All` = (7+9) / 20 = 80%
- `Precision (P) = TP / (TP + FP)` = 7 / (7+3) = 70%
- `Recall (R) = TP / (TP + FN)` = 7 / (7+1) = 87.5%




	
- [x] Give your bot a name in the README.md file.
	
- [x] Optional: Render your name somewhere in the Window
	
- [x] Upload all source files/images to github and send me a link.


![demo.gif](https://github.com/linnnes/CI2017/blob/master/hw10/demo.gif?raw=true)
