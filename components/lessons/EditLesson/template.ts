const template = `
![Mathuto icon](https://mathuto-dashboard.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d0d25dcf.png&w=256&q=75) 
# Mathuto Editor Tutorial

*(You can delete this after you read this)*

## What is this for?

This editor is being run by Markdown. A lightweight language that allows you to add formatting elements in your plain text documents. Rather than reading those texts with a plain, boring look, you can add your **personalized styles** and **formats** in your editor. Markdown is widely used in blogging, instant messaging, online forums, collaborative software, documentation pages, and readme files.

## Basic Syntax

### **Headings**
Create headings by starting a line with one or more # followed by a space:

| Markdown          | Rendered Output         |
|-------------------|-------------------------|
| # Header Level 1  | <h1> Header Level 1</h1>|
| ## Header Level 2 | <h2> Header Level 2</h2>|
| ### Header Level 3| <h3> Header Level 3</h3>|
| #### Header Level 4| <h4> Header Level 4</h4>|
| ##### Header Level 5| <h5> Header Level 5</h5>|
| ###### Header Level 6| <h6> Header Level 6</h6>|

### **Emphasis**
Emphasize text with *italics* or **bold**:

| Markdown             | Rendered Output |
|----------------------|-----------------|
| \*Italic\* or \_Italic\_ | _italic_       |
| \*\*bold\*\*  or \_\_bold\_\_  | **bold** |

### **Lists**
Create ordered and unordered lists:

#### Unordered
\`\`\`markdown
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2
\`\`\`

- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

#### Ordered
\`\`\`markdown
1. First item
2. Second item
3. Third item
\`\`\`

1. First item
2. Second item
3. Third item

### **Links**
Add reference links to your external sources. We recommend considering adding links in the **External Links** section for better accessibility.

\`\`\`markdown
[This is a link to youtube](https://youtube.com)
\`\`\`

[This is a link to youtube](https://youtube.com)

### **Images**
Embed images using a similar syntax as links but with an exclamation mark! at the beginning:

\`\`\`markdown
![Alt Text: Disney Inside Out 2](https://www.usatoday.com/gcdn/authoring/authoring-images/2024/01/08/USAT/72152135007-inside-out-2-onlineus-epubstillpub-16.jpg?crop=2233,1672,x229,y0)
\`\`\`

![Alt Text: Disney Inside Out 2](https://www.usatoday.com/gcdn/authoring/authoring-images/2024/01/08/USAT/72152135007-inside-out-2-onlineus-epubstillpub-16.jpg?crop=2233,1672,x229,y0)

> When using images as reference, please link your image through **"https:"** for it to be accessible everywhere.

### **Blockquotes**
Create blockquotes using the > character:

\`\`\`markdown
> This is a blockquote.
\`\`\`

> This is a blockquote.

### **Horizontal Rules**
Create a horizontal rule by using three or more dashes, asterisks, or underscores:

\`\`\`markdown
---
***
___
\`\`\`

---
***
___

### **Tables**
Create tables using a combination of pipes | and dashes -:

\`\`\`markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Row 1    | Data 1   |
| Row 2    | Data 2   |
\`\`\`

| Header 1 | Header 2 |
| -------- | -------- |
| Row 1    | Data 1   |
| Row 2    | Data 2   |

### **Strikethrough**
Add strikethrough text using double tildes ~~:

\`\`\`markdown
~~This is strikethrough text~~
\`\`\`

~~This is strikethrough text~~

---

For more detailed information, check out the [official Markdown](https://www.markdownguide.org/basic-syntax/#overview).

### Happy writing with Mathuto!
![Mathuto icon](https://mathuto-dashboard.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d0d25dcf.png&w=256&q=75) 
`;

export default template;
