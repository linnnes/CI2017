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



