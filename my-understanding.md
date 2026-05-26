# My Understanding

## Submission Links

**Loom Video (must be set to public — anyone with the link):**
https://www.loom.com/share/597d04d9bb5745a0ac9da5ab26f259ca

---

## Questions

Answer each question in your own words. There are no trick questions.

The goal is not a perfect answer — it is an honest one. Write as if you are explaining to a friend who has never used Express. Completing this will prepare you for your video walkthrough.

Do not copy from documentation, your code comments, or AI output. If you are unsure about something, write what you do understand and note where the gap is.

---

**1. What does each HTTP method in your API mean — GET, POST, PUT or PATCH, and DELETE? Why do we use different methods instead of just using POST for everything?**

_Your answer:_
**ใช้เพื่อสื่อสารกับ Server เพื่อจัดการข้อมูลต่างๆ ด้วยหลัก CRUD**

---

**2. What is `express.json()` and what would happen if you left it out?**

_Your answer:_
**express.json() คือ middleware ในตัวของ Express ทำหน้าที่อ่าน raw text ทั้งหมดจาก body ที่ client ส่งมา (เมื่อมี Content-Type: application/json) ซึ่งเดิมเป็น JSON string แล้วใช้ JSON.parse() แปลงให้เป็น JS object ที่ JavaScript ใช้ได้ ผลคือ เราสามารถใช้ req.body ในโค้ด route ได้ ถ้าไม่ใส่ express.json() req.body จะเป็น undefined**

---

**3. What is the difference between `req.body`, `req.params`, and `req.query`? Give a real example from your API for each one.**

_Your answer:_
**req.params ใช้เมื่อต้องการระบุข้อมูลที่ฝังอยู่ใน path ของ URL**
**req.query ใช้สำหรับเงื่อนไขเสริม เช่น filter, sort, search**
**req.body ใช้สำหรับส่งข้อมูลก้อนใหญ่เข้ามาสร้างหรือแก้ไข — อยู่ใน body ของ request (และต้องมี express.json() ช่วยแปลง)**

---

**4. What are HTTP status codes? List every status code you used in your API and explain why you chose it for that situation.**

_Your answer:_
**เป็นตัวเลข 3 หลักที่ Server ส่งกลับไปหา Client ว่า Request เป็นยังไง**

---

**5. What is middleware? Describe what it does in your own words and give one example from your code.**

_Your answer:_
**เป็นตัวคั่นกลาง request ที่ client ส่งมา กับ response ที่ server ตอบกลับ**

---

**6. Why does the order of middleware matter in Express? What could go wrong if it were in the wrong order?**

_Your answer:_
**ลำดับสำคัญ เพราะ express วิ่ง middleware จากบนลงล่าง ตามลำดับโค้ดที่เขียน**

---

**7. Walk through what happens on the server, step by step, when a POST request is sent to `/products`.**

_Your answer:_

---

**8. What is CRUD? Map each operation to the HTTP method and route you used in your API.**

_Your answer:_
**CRUD ย่อมาจาก Create, Read, Update, Delete เป็นการทำงานพื้นฐาน 4 อย่างที่ทุก API ส่วนใหญ่ทำได้**

---

**9. How does your API respond when something goes wrong — for example, when a product with a given ID does not exist?**

_Your answer:_

---

**10. What was the hardest part of building this API and what did you do to get past it?**

_Your answer:_
มีหลายจุดที่ยากในการทำ assessement นี้ ทั้งเรื่องความเข้าใจ พื้นฐานในการเขียน หลัก logic แต่สิ่งที่ได้เรียนรู้คือการเข้าใจในพื้นฐานของภาษา backend ที่ใช้ การอ่าน error message เรียงไปแต่ละจุด
