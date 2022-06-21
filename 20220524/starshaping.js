document.write("별모양1");
document.write('<br>');
for (let i = 0; i < 5; i++) {
    for (let k = 0; k <= i; k++) {
        document.write('*');
    }
    document.write('<br>');
}
document.write('<br>')

document.write("별모양2");
document.write('<br>');
for (let i = 0; i < 5; i++) {
    for (let h = 1; h <= i; h++) {
        document.write('\u00A0');
    }
    for (let k = 5; k > i; k--) {
        document.write("*")
    }
    document.write('<br>');
}
document.write('<br>')

document.write("별모양3");
document.write('<br>');
for (let i = 0; i < 5; i++) {
    for (let h = 4; h > i; h--) {
        document.write("\u00A0")
    }
    for (let k = 0; k <= i; k++) {
        document.write('*');
    }
    document.write('<br>');
}
document.write('<br>')

document.write("별모양4-1");
document.write('<br>');
for (let i = 0; i < 5; i++) {
    for (let k = 5; k > i; k--) {
        document.write("*")
    }
    document.write('<br>');
}

document.write("별모양4-2");
document.write('<br>');
for (let i = 5; i > 0; i--) {
    for (let k = 0; k < i; k++) {
        document.write('*');
    }
    document.write('<br>');
}
document.write('<br>')

document.write("삼각형");
document.write('<br>');
for (let i = 0; i < 5; i++) {
    for (let h = 4; h > i; h--) {
        document.write("\u00A0")
    }
    for (let k = 0; k <= 2 * i; k++) {
        document.write('*');
    }
    document.write('<br>');
}
document.write('<br>')


document.write("역삼각형");
document.write('<br>');
for (let i = 0; i < 5; i++) {
    for (let h = 1; h <= i; h++) {
        document.write('\u00A0');
    }
    for (let k = 9; k > 2 * i; k--) {
        document.write("*")
    }
    document.write('<br>');

}
document.write('<br>')

document.write("<트리>");
document.write('<br>');
for (let i = 0; i < 5; i++) {
    for (let h = 6; h > i; h--) {
        document.write("\u00A0")
    }
    for (let k = 0; k <= 2 * i; k++) {
        document.write('*');
    }
    document.write('<br>');
}
let a=0
while(a<3){
    document.write("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"+"***")
    document.write('<br>')
    a++
}
let b=0
while(b<3){
    document.write("**************");
    document.write('<br>');
    b++
}
document.write('<br>')
