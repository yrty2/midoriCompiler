const midori={
    help(value){
        if(value==undefined){console.log(
`midoriは数学言語をjavascriptへコンパイルするライブラリです。
midori.run(print(i*2i))を打ってみてください。
midoriはデフォルトで複素数の演算を使用します。
また、関数や演算子をオーバーロードすることもできます。
その場合はmidori.settingをいじってください。
いくつか仕様上の注意点があります。詳細を読む場合はmidori.help(0)を実行してください。
演算子のリストを見たい場合、midori.help(1)を実行してください。
より詳しい説明についてはhttps://github.com/yrty2/midoriCompilerを御覧ください。`
    );}
        if(value==0){console.log(
`・変数をmidori内で使用する場合は、midori.run(code)の代わりにmidori.call(code,...variables)あるいはeval(midori.compile(code))を実行してください。(ループ内で使うとき、midori.call()は純粋なjsと同等の速度が出ます)
・多重階乗は実装されていません。
・多重冪乗(2^2^2^2など)は計算順序が左から右になります。本来は右から左なのですが、そういうイレギュラーな計算順序は難しいんです。(許して)
・midoriはある程度曖昧な数式を解釈できます。例えば(1+i)(1-i)という式を(1+i)*(1-i)と解釈して実行します。他にも2xを2*xとして解釈することができるのですが、2xという変数名は使えないのでご注意を。midori.setting.notation="strict"と入力すると、javascriptの数式記法になります(これらの省略ができなくなります)。
あと、関数と変数の見分けをつけるため、変数名abcのような2文字以上の変数に対しては、abc*(x)=>abc(x)のような省略が不可能です。この文字数はmidori.setting.minMathematicalFuncLengthで変えることができます。
・微分の対象となる変数はデフォルトでzです。`
    );}
        if(value==1){console.log(
`演算子のリスト

単項演算子
$->平方根 sqrt
!->階乗 fact
~->共役 conjugate
°->弧度法 angle

二項演算子
+->加算 sum
-->減算 sub
*->乗算 mul
/->除算 quot
^->冪乗 pow
%->余り mod
・->スカラー積 dot

特殊な演算子
||->絶対値 abs`
    );}
    },
    float:{
        minMathematicalFuncLength:2,
        notation:"mathematical",//(x+1)(x-1)のように乗法演算子を省略できます。
        //strict　(x+1)*(x-1)と書かなければいけない
        number:"xarg",
        abs:"Math.abs(xarg)",
        der:null,//微分
        constants:[
            {
                identifier:"pi",
                value:"c32.const(3.141592653589793,0)"
            },
            {
                identifier:"e",
                value:"c32.const(2.718281828459045,0)"
            }
        ],
        functions:[
            {
                name:"print",
                replace:"console.log"
            },
            {
                name:"log",
                replace:"Math.log"
            },
            {
                name:"sin",
                replace:"Math.sin",
            },
            {
                name:"cos",
                replace:"Math.cos",
            },
            {
                name:"tan",
                replace:"Math.tan",
            },
            {
                name:"floor",
                replace:"Math.floor",
            }
        ],
        //四則演算+冪+ドット+mod
        sum:"(xarg+(yarg))",
        sub:"(xarg-(yarg))",
        mul:"(xarg*(yarg))",
        quot:"(xarg/(yarg))",
        pow:"Math.pow(xarg,yarg)",
        mod:"math.mod(xarg,yarg)",
        dot:null,
        //単項演算子
        sqrt:"Math.sqrt(xarg)",
        fact:"math.fact(xarg)",
        conjugate:null,
        angle:"(180*(xarg)/Math.PI)",
        //条件
        gt:"xarg>yarg",
        ge:"xarg>=yarg",
        lt:"xarg<yarg",
        le:"xarg<=yarg",
        eq:"xarg==yarg",
    },
    complex:{
        minMathematicalFuncLength:2,
        notation:"mathematical",//(x+1)(x-1)のように乗法演算子を省略できます。
        //strict　(x+1)*(x-1)と書かなければいけない
        number:"c32.const(xarg,0)",
        abs:"c32.abs",
        der:"c32.der(xarg)",//微分
        constants:[
            {
                identifier:"i",
                value:"c32.const(0,xarg)"
            },
            {
                identifier:"pi",
                value:"c32.const(3.141592653589793,0)"
            },
            {
                identifier:"e",
                value:"c32.const(2.718281828459045,0)"
            }
        ],
        functions:[
            {
                name:"print",
                replace:"c32.print"
            },
            {
                name:"log",
                replace:"c32.log"
            },
            {
                name:"Arg",
                replace:"c32.arg"
            },
            {
                name:"Re",
                replace:"c32.re"
            },
            {
                name:"Im",
                replace:"c32.im"
            },
            {
                name:"sin",
                replace:"c32.sin",
            },
            {
                name:"cos",
                replace:"c32.cos",
            },
            {
                name:"tan",
                replace:"c32.tan",
            },
            {
                name:"floor",
                replace:"c32.floor",
            }
        ],
        //四則演算+冪+ドット+mod
        sum:"c32.sum(xarg,yarg)",
        sub:"c32.sub(xarg,yarg)",
        mul:"c32.mul(xarg,yarg)",
        quot:"c32.quot(xarg,yarg)",
        pow:"c32.pow(xarg,yarg)",
        mod:"c32.mod(xarg,yarg)",
        dot:null,
        //単項演算子
        sqrt:"c32.sqrt(xarg)",
        fact:"c32.fact(xarg)",
        conjugate:"c32.conjugate(xarg)",
        angle:null,
        //条件
        gt:"xarg[0]>yarg[0]",
        ge:"xarg[0]>=yarg[0]",
        lt:"xarg[0]<yarg[0]",
        le:"xarg[0]<=yarg[0]",
        eq:"xarg[0]==yarg[0]",
    },
    quaternion:{
        minMathematicalFuncLength:2,
        notation:"mathematical",
        number:"q32.const(xarg,0,0,0)",
        abs:"q32.abs",
        constants:[
            {
                identifier:"i",
                value:"q32.const(0,xarg,0,0)"
            },
            {
                identifier:"j",
                value:"q32.const(0,0,xarg,0)"
            },
            {
                identifier:"k",
                value:"q32.const(0,0,0,xarg)"
            },
            {
                identifier:"pi",
                value:"q32.const(3.141592653589793,0,0,0)"
            },
            {
                identifier:"e",
                value:"q32.const(2.718281828459045,0,0,0)"
            }
        ],
        functions:[
            {
                name:"print",
                replace:"q32.print"
            },
            {
                name:"Arg",
                replace:"q32.arg"
            },
            {
                name:"Re",
                replace:"q32.re"
            },
            {
                name:"Im",
                replace:"q32.im"
            },
            {
                name:"sin",
                replace:"q32.sin",
            },
            {
                name:"cos",
                replace:"q32.cos",
            },
            {
                name:"tan",
                replace:"q32.tan",
            },
            {
                name:"floor",
                replace:"q32.floor",
            }
        ],
        //四則演算+冪+ドット+mod
        sum:"q32.sum(xarg,yarg)",
        sub:"q32.sub(xarg,yarg)",
        mul:"q32.mul(xarg,yarg)",
        quot:"q32.quot(xarg,yarg)",
        pow:"q32.pow(xarg,yarg)",
        mod:"q32.mod(xarg,yarg)",
        dot:null,
        //単項演算子
        sqrt:"q32.pow(xarg,c32.const(0.5,0))",
        fact:"q32.fact(xarg)",
        conjugate:"q32.conjugate(xarg)",
        angle:null
    },
    tex:{
        minMathematicalFuncLength:2,
        notation:"mathematical",
        number:"xarg",
        abs:null,
        constants:[
        ],
        functions:[
        ],
        //四則演算+冪+ドット+mod
        sum:"xarg+yarg",
        sub:"xarg-yarg",
        mul:"xarg\times{yarg}",
        quot:"\frac{xarg}{yarg}",
        pow:"xarg^{yarg}",
        mod:"xarg\bmod{yarg}",
        dot:"xarg\cdot{yarg}",
        //単項演算子
        sqrt:"\sqrt{xarg}",
        fact:"xarg!",
        conjugate:"\overline{xarg}",
        angle:null
    },
    setting:undefined,//もし'undefined'なら、複素数になる。
    tokenizer(code){
        function pushAt(u,t,v){
        return [...u.slice(0,t+1),v,...u.slice(t+1,u.length)];
        }
        function In(a,u){
            return u.findIndex(e=>JSON.stringify(e)==JSON.stringify(a))!=-1;
        }
        var token=[];
        var tape="";
        function cut(){
            if(tape.length>0){
                token.push(tape);
            }
            tape="";
        }
        function add(value){
            token.push(value);
        }
        var reading=0;
        const functions=["exp"];
        const operators=["+","-","*","/","^","!","~","%","=","・","°",",","$","'",":",">","<"];
        //課題：冪演算が乗算と同じ優先度になっている。
        //優先度　階乗>>冪乗>>乗算>>加算>>符号
        var startpoint=true;
        let inabs=false;
        for(let k=0; k<code.length; ++k){
            var safe=true;//テープに記述するか
            const word=code[k];
            if(word=="(" || word==")"){
                reading=0;
                startpoint=(word=="(");
                //カッコだった。
                cut();
                add(word);
                safe=false;
            }
            if(word=="{" || word=="}"){
                reading=0;
                startpoint=(word=="{");
                //カッコだった。
                cut();
                add(word);
                safe=false;
            }
            if(/^[a-zA-Z]+$/.test(word) && reading==0){
                //変数または関数
                reading=1;
                cut();
            }
            if(word=="|"){
                //絶対値記号だった。
                cut();
                add(word);
                inabs=!inabs;
                safe=false;
            }
            if(In(word,operators)){
                reading=0;
                if(startpoint && (word=="+" || word=="-")){
                    cut();
                    if(word=="-"){
                    add("-1");
                    add("*");
                    }
                    safe=false;
                }else{
                cut();
                add(word);//二項演算子であった。
                safe=false;
                }
            }
            if(safe){
            tape+=word;
            }
            if(word!="(" && word!="{"){
            startpoint=false;
            }
            if(inabs && word=="|"){
                startpoint=true;
            }
            if(word==":"){
                startpoint=true;
            }
        }
        cut();
        if(midori.setting.notation=="mathematical"){
            for(let k=0; k<token.length; ++k){
                if(k+1<token.length){
                    var now=token[k];
                    var next=token[k+1];
                    if(now==")" && next=="("){
                        token=pushAt(token,k,"*");
                    }
                    if(now==")" && (!isNaN(next) || /^[a-zA-Z]+$/.test(next))){
                        token=pushAt(token,k,"*");
                    }
                    if(!isNaN(now) && (next=="(" || /^[a-zA-Z]+$/.test(next))){
                        token=pushAt(token,k,"*");
                    }
                    if(/^[a-zA-Z]+$/.test(now) && next=="("){
                        //関数と見分けをつける。
                        if(this.setting.minMathematicalFuncLength>now.length){
                        token=pushAt(token,k,"*");
                        }
                    }
                }
            }
        }
        return token;
    },
    parser(token){
        let pos=0;
        function peek() {
            return token[pos];
        }
        function consume() {
            return token[pos++];
        }
        function expect(value) {
            if(peek()!==value){
                console.warn(`[ ${value} ]が見つかりません！`);
                if(value==":"){
                    console.warn("どの条件にも入らない場合は{~,otherwise:~}と書いてください");
                }
                midori.errored=true;
            }
            consume();
        }
        function parseExpression(){
            if(!midori.errored){
                let In;
            if(peek()=="|"){
                In="|";
            }
            let node=parseTerm();
                node.in=In;
            while(peek()==="+" || peek()==="-"){
                //+か-であるなら。
                const operator=consume();
                const right=parseTerm();
                node={type:"BinaryExpression",operator,left: node,right};
            }
            if(!node){
                console.warn(`カッコの中身がありません！`);
                midori.errored=true;
                return;
            }
            return node;
            }
        }
        function parseTerm(){
            let node=parseDeepTerm();
            while(peek()==="*" || peek()==="/" || peek()==="・"){
                const operator=consume();
                const right=parseDeepTerm();
                node={type:"BinaryExpression",operator,left:node,right};
            }
            return node;
        }
        function parseDeepTerm(){
            let node=parsePrimary();
            while(peek()==="^" || peek()==="%" || peek()===">" || peek()==="<" || peek()==="="){
                let operator=consume();
                if(peek()=="="){
                    operator+=consume();
                }
                const right=parsePrimary();
                node={type:"BinaryExpression",operator:operator,left:node,right};
            }
            return node;
        }
        function findRightUnary(value){
            if(peek()==="$" || peek()==="!" || peek()==="~" || peek==="°"){
                var operator=peek();
                consume();
                return {type:"UnaryExpression",operator:operator,value:value};
            }
            return value;
        }
        function parsePrimary(){
            const t = peek();
            //実数か？
            if(!isNaN(t)){
                consume();
                return findRightUnary({type:"Literal",value:Number(t)});
            }
            //数字でない場合
            if(/^[a-zA-Z-.-0-1-2-3-4-5-6-7-8-9]+$/.test(t)){
                const name = consume();
                //関数呼出しか？
                if(peek()==="(" || peek()==="'"){
                    let derivate=0;
                    while(peek()==="'"){
                        consume();
                        derivate++;
                    }
                    consume();
                    let argument=[];
                    while(true){
                        //()の中身がない場合もある。そのばあい(void)
                    if(peek()==="void"){
                        consume();
                    }else{
                    argument.push(parseExpression());
                    }
                        if(peek()!==","){
                            break;
                        }
                        consume();
                    }
                    expect(")");
                    return findRightUnary({type:"CallExpression",callee:{type:"Identifier",name},arguments:argument,derivate:derivate});
                }
                //関数でないなら変数
                if(name===undefined){
                console.warn(`構文エラー：二項演算の右辺が入力されていません。`);
                midori.errored=true;
                }
                return findRightUnary({type:"Identifier",name});
            }
            //カッコなら
            if(t==="("){
                consume();
                const nodes=[];
                while(true){
                nodes.push(parseExpression());
                    if(peek()!==","){
                        break;
                    }else{
                        consume();
                    }
                }
                expect(")");
                if(nodes.length<=1){
                    return findRightUnary(nodes[0]);
                }else{
                    for(let k=0; k<nodes.length; ++k){
                        nodes[k]=findRightUnary(nodes[k]);
                    }
                    //加群
                    return {value:nodes,type:"Vector",dimention:nodes.length};
                }
            }
            //区分線形関数
            if(t==="{"){
                consume();
                const nodes=[];
                while(true){
                    let node={conditions:{},res:{}};
                    node.conditions=findRightUnary(parseExpression());
                    expect(":");
                    node.res=findRightUnary(parseExpression());
                    nodes.push(node);
                    if(peek()!==","){
                        break;
                    }else{
                        consume();
                    }
                }
                expect("}");
                return {tree:nodes,type:"PiecewiseExpression"};
            }
            //絶対値記号
            if(t==="|"){
                consume();
                const node = parseExpression(t);
                expect("|");
                return findRightUnary(node);
            }
            console.warn(`構文エラー:${t}が理解できません。`);
            midori.errored=true;
            if(t=="-"){
                console.warn(`おそらく[x*-y]のようにしていませんか？\n正しいスペル[x*(-y)]`);
            }
        }
        const ast=parseExpression();
        if(midori.errored){
            midori.errored=false;
            return "errorDetected";
        }
        return ast;
    },
    scripten(ast,asf){
        const variable=[];
        function parseAST(kst){
            let tape="";
            if(kst.type=="Literal"){
                tape+=midori.setting.number.replace("xarg",`${kst.value}`);
            }
            if(kst.type=="Vector"){
                tape+="[";
                for(let k=0; k<kst.dimention; ++k){
                    tape+=`${parseAST(kst.value[k])}`;
                    if(k+1<kst.dimention){
                        tape+=",";
                    }
                }
                tape+="]";
            }
            if(kst.type=="Identifier"){
                if(kst.name=="otherwise" || kst.name=="true"){
                    tape+="true";
                }else{
                var id=midori.setting.constants.findIndex(e=>e.identifier==kst.name);
                if(id!=-1){
                    tape+=midori.setting.constants[id].value.replace("xarg","1");
                }else{
                    if(asf){
                        const id=variable.indexOf(kst.name);
                        if(id==-1){
                            tape+=`v[${variable.length}]`;
                            variable.push(kst.name);
                        }else{
                            tape+=`v[${id}]`;
                        }
                    }else{
                        tape+=kst.name;
                    }
                }
                }
            }
            if(kst.type=="BinaryExpression"){
                if(kst.in=="|"){
                    tape+=`${midori.setting.abs}(`;
                }
                if(kst.operator=="+"){
                tape+=midori.setting.sum.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator=="-"){
                tape+=midori.setting.sub.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator=="*"){
                tape+=midori.setting.mul.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator=="/"){
                tape+=midori.setting.quot.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator=="^"){
                tape+=midori.setting.pow.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator=="%"){
                tape+=midori.setting.mod.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator=="・"){
                tape+=midori.setting.dot.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                //条件
                if(kst.operator=="=" || kst.operator=="=="){
                tape+=midori.setting.eq.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator=="<"){
                tape+=midori.setting.lt.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator=="<="){
                tape+=midori.setting.le.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator==">"){
                tape+=midori.setting.gt.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.operator==">="){
                tape+=midori.setting.ge.replace("xarg",`${parseAST(kst.left)}`).replace("yarg",`${parseAST(kst.right)}`);
                }
                if(kst.in=="|"){
                    tape+=")";
                }
            }
            if(kst.type=="UnaryExpression"){
                if(kst.in=="|"){
                    tape+=`${midori.setting.abs}(`;
                }
                if(kst.operator=="$"){
                tape+=midori.setting.sqrt.replace("xarg",`${parseAST(kst.value)}`);
                }
                if(kst.operator=="!"){
                tape+=midori.setting.fact.replace("xarg",`${parseAST(kst.value)}`);
                }
                if(kst.operator=="~"){
                tape+=midori.setting.conjugate.replace("xarg",`${parseAST(kst.value)}`);
                }
                if(kst.operator=="°"){
                tape+=midori.setting.angle.replace("xarg",`${parseAST(kst.value)}`);
                }
                if(kst.in=="|"){
                    tape+=")";
                }
            }
            if(kst.type=="CallExpression"){
                var name=kst.callee.name;
                var id=midori.setting.functions.findIndex(e=>e.name==name);
                if(id!=-1){
                    name=midori.setting.functions[id].replace;
                }
                //微分
                for(let k=0; k<kst.derivate; ++k){
                    if(k==0){
                        name=midori.setting.der.replace("xarg",`z=>${name}(z)`);
                    }else{
                        name=midori.setting.der.replace("xarg",`${name}`);
                    }
                }
                tape+=`${name}(`;
                for(let a=0; a<kst.arguments.length; ++a){
                tape+=parseAST(kst.arguments[a]);
                    if(a+1<kst.arguments.length){
                    tape+=",";
                    }else{
                        tape+=")";
                    }
                }
            }
            if(kst.type=="PiecewiseExpression"){
                let parsedTree="";
                console.log(kst.tree);
                for(let k=0; k<kst.tree.length; ++k){
                    parsedTree+=`{condition:${parseAST(kst.tree[k].conditions)},res:${parseAST(kst.tree[k].res)}}`;
                    if(k+1<kst.tree.length){
                        parsedTree+=",";
                    }
                }
                tape+=`math.piecewiseLinear([${parsedTree}])`;
            }
            return tape;
        }
        if(ast!="errorDetected"){
        let script="";
        script+=parseAST(ast);
        return script;
        }
        return "console.error('コンパイルに失敗:'+code)";
    },
    parsedmidori(code){
        return this.parser(this.tokenizer(code));
    },
    midoriStock:[],//{inport:入力,export:出力,environment:setting}
    midoriStockOfFunctions:[],//{inport:入力,export:出力,environment:setting:setting}
    compile(code){
        const id=this.midoriStock.findIndex(e=>e.import==code && e.environment==midori.setting);
        if(id==-1){
            const JSmidori=this.scripten(this.parser(this.tokenizer(code)));
            this.midoriStock.push({import:code,export:JSmidori,environment:midori.setting});
            console.log(JSmidori(c32.const(2,0)));
            return JSmidori.export;
        }else{
            return this.midoriStock[id].export;
        }
    },
    run(code){
        return eval(this.compile(code));
    },
    compileAsFunction(code){
        const id=this.midoriStockOfFunctions.findIndex(e=>e.import==code && e.environment==midori.setting);
        if(id==-1){
            const JSmidori=new Function("v","return "+this.scripten(this.parser(this.tokenizer(code)),true));
            this.midoriStockOfFunctions.push({import:code,export:JSmidori,environment:midori.setting});
            return JSmidori;
        }
        return this.midoriStockOfFunctions[id].export;
    },
    call(code,...environment){
        //再帰的な処理ではこれが圧倒的に早い
        return this.compileAsFunction(code)(environment);
    },
    errored:false,
    wasmStack:[],
    wasmer(midoricode){
        function ieee754(value){
            if(value==0){
                return [0x00,0x00,0x00,0x00];
            }
            let bit=[];
            let bytes=[];
            let ex=127;
            bit.push((-Math.sign(value)+1)/2);
            value=Math.abs(value);
            while(value>=2){
                value*=1/2;
                ex++;
            }
            while(1>value){
                value*=2;
                ex--;
            }
            let binary=value.toString(2).slice(2);
            let exp=ex.toString(2);
            let K=0;
            for(let k=0; k<8; ++k){
                if(exp.length>=8-k){
                    bit.push(exp[K]);
                    K++;
                }else{
                    bit.push("0");
                }
            }
            for(let k=0; k<23; ++k){
                if(binary.length>k){
                    bit.push(binary[k]);
                }else{
                    bit.push("0");
                }
            }
            for(let k=3; k>=0; --k){
                bytes.push(parseInt(bit[8*k]+bit[8*k+1]+bit[8*k+2]+bit[8*k+3]+bit[8*k+4]+bit[8*k+5]+bit[8*k+6]+bit[8*k+7],2));
            }
            return bytes;
        }
        function UTFer(string){
            return new TextEncoder().encode(string);
        }
        const variable=[];
        const ast=midori.parsedmidori(midoricode);
        const f32={
            const:0x43,
            add:0x92,
            sub:0x93,
            mul:0x94,
            div:0x95,
            floor:0x8e,
            abs:0x8b,
            sqrt:0x91,
            lt:0x5d,
            le:0x5f,
            gt:0x5e,
            ge:0x60,
            eq:0x5b,
            ne:0x5c
        }
        const i32={
            const:0x41
        }
        const local={
            get:0x20,
            set:0x21,
            f32:0,
            i32:0
        }
        const op={
            f32:0x7d,
            end:0x0b,
            else:0x05,
            if:0x04,
            block:0x02,
            br_if:0x0d,
            br:0x0c,
            void:0x40,
            loop:0x03
        }
        console.log(ast);
        function parseAST(kst){
            let tape=[];
            if(kst.type=="Literal"){
                tape.push(f32.const,...ieee754(kst.value));
            }
            if(kst.type=="Identifier"){
                //local.get
                if(kst.name=="otherwise" || kst.name=="true"){
                    tape.push(i32.const,1);
                }else{
                    const id=variable.indexOf(kst.name);
                    if(id==-1){
                        tape.push(local.get,variable.length);
                        variable.push(kst.name);
                    }else{
                        tape.push(local.get,id);
                    }
                }
            }
            if(kst.type=="BinaryExpression"){
                if(kst.operator=="+"){
                tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.add);
                }
                if(kst.operator=="-"){
                tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.sub);
                }
                if(kst.operator=="*"){
                tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.mul);
                }
                if(kst.operator=="/"){
                tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.div);
                }
                if(kst.operator=="^"){
                    tape.push(...parseAST(kst.left));
                    //指数が数式でない整数であるとする
                    //この方法は後に変える。(wasmが長すぎてしまう可能性があるため)
                    for(let k=0; k<kst.right.value; ++k){
                    tape.push(...parseAST(kst.left),f32.mul);
                    }
                }
                if(kst.operator=="%"){
                    tape.push(...parseAST(kst.left));
                    tape.push(...parseAST(kst.right));
                    tape.push(...parseAST(kst.left));
                    tape.push(...parseAST(kst.right));
                    tape.push(f32.div,f32.floor,f32.mul,f32.sub);
                }
                //条件
                if(kst.operator=="=" || kst.operator=="=="){
                    tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.eq);
                }
                if(kst.operator=="<"){
                    tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.lt);
                }
                if(kst.operator=="<="){
                    tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.le);
                }
                if(kst.operator==">"){
                    tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.gt);
                }
                if(kst.operator==">="){
                    tape.push(...parseAST(kst.left),...parseAST(kst.right),f32.ge);
                }
                if(kst.in=="|"){
                    tape.push(f32.abs);
                }
            }
            if(kst.type=="UnaryExpression"){
                if(kst.operator=="$"){
                tape.push(...parseAST(kst.value),f32.sqrt);
                }
                if(kst.operator=="!"){
                    //整数階乗
                    local.f32++;//localf32追加
                    const time=`lv:${local.i32+local.f32}`;
                    local.f32++;//localf32追加
                    const value=`lv:${local.i32+local.f32}`;
                    tape.push(f32.const,...ieee754(1));
                    tape.push(local.set,value);
                    tape.push(...parseAST(kst.value));
                    tape.push(local.set,time);
                    tape.push(op.block,op.void,op.loop,op.void);
                    //脱出条件
                    tape.push(local.get,time,f32.const,...ieee754(0),f32.eq,op.br_if,1);
                    tape.push(local.get,time,local.get,value,f32.mul,local.set,value);
                    tape.push(local.get,time,f32.const,...ieee754(1),f32.sub,local.set,time);
                    tape.push(op.br,0,op.end,op.end,local.get,value);
                }
                if(kst.operator=="~"){
                }
                if(kst.operator=="°"){
                }
                if(kst.in=="|"){
                    tape.push(f32.abs);
                }
            }
            if(kst.type=="PiecewiseExpression"){
                function parseConditions(k){
                    tape.push(...parseAST(kst.tree[k].conditions),op.if,op.f32);
                    tape.push(...parseAST(kst.tree[k].res),op.else);
                    if(k+1==kst.tree.length){
                    tape.push(f32.const,...ieee754(0));//でなければ
                    }else{
                        parseConditions(k+1);
                    }
                    tape.push(op.end);
                }
                parseConditions(0);
            }
            return tape;
        }
        if(ast!="errorDetected"){
        let code=[];
        code.push(...parseAST(ast));
        for(let k=0; k<code.length; ++k){
            if(isNaN(code[k])){
            if(code[k].indexOf("lv:")!=-1){
                code[k]=parseInt(code[k].slice(3))+variable.length-1;
            }
            }
        }
    const compiled=new WebAssembly.Instance(new WebAssembly.Module(Uint8Array.from([
        ...[0x00, 0x61, 0x73, 0x6d],
        ...[0x01, 0x00, 0x00, 0x00],
        //sections
        ...[0x01,0x05+variable.length,0x01],//type
        ...[0x60,variable.length,...variable.fill(0x7d),0x01,0x7d],//引数とか
        ...[0x03,0x02,0x01,0x00],//Function
        ...[0x07,0x07,0x01,0x03,114,101,115,0x00,0x00],//exports
        ...[0x0a,code.length+6,0x01],//code
        ...[code.length+4,0x01,local.f32,0x7d],//func [btl,local declear count,...types]
        ...code,
        ...[0x0b]
    ]))).exports.res;
            midori.wasmStack.push({code:midoricode,output:compiled,input:[]});
            return compiled;
        }
        return "console.error('コンパイルに失敗:'+code)";
    },
    callf(code,...variable){
        const id=midori.wasmStack.findIndex(e=>e.code==code);
        if(id==-1){
        return midori.wasmer(code)(...variable);
        }
        return midori.wasmStack[id].output(...variable);
    },
    f2tcompiler:{
        keyword:["\frac","\sqrt","\pm"],
        tokenizer(tex){
            let token=[];
            let begin=true;
            let tape="";
            const operator=["+","-","^"];
            function cut(){
                if(tape!=""){
                token.push(tape);
                tape="";
                }
            }
            function add(value){
                token.push(value);
            }
            for(let k=0; k<tex.length; ++k){
            //低層解析
                let safe=true;
                const word=tex[k];
                if(!begin && operator.indexOf(word)!=-1){
                    //オペレーターである。
                    cut();
                    add(word);
                    safe=false;
                }
                if(word=="{"){
                    cut();
                    add("(");
                    safe=false;
                }
                if(word=="}"){
                    cut();
                    add(")");
                    safe=false;
                }
                if(safe){
                    tape+=word;
                }
                begin=false;
                if(word=="{"){
                    begin=true;
                }
            }
            cut();
            //深層解析
            const keyword=midori.f2tcompiler.keyword;
            for(let k=0; k<token.length; ++k){
                const now=token[k];
                const id=keyword.findIndex(e=>now.indexOf(e)!=-1);
                if(id!=-1){
                    const key=keyword[id];
                    const pos=now.indexOf(key);
                    if((pos-1>=0 && now[pos-1]!="¥") || pos==0){
                    if(token[k].slice(0,pos)!=""){
                    token[k]=token[k].slice(0,pos);
                    token=maths.pushAt(token,k,"¥"+key);
                        k--;
                    }else{
                    token[k]="¥"+key;
                    }
                    }
                }
            }
            return token;
        },
        parser(token){
            let pos=0;
            function peek(){return token[pos]}
            function consume(){return token[pos++]}
            function expect(value){
                if(peek()!==value){
                    console.warn(`[ ${value} ]が見つかりません！`);
                    midori.errored=true;
                }
                consume();
            }
            function parseExpression(t){
                console.log(peek());
                if(!midori.errored){
                    let node=parseTerm();
                    if(peek()=="|"){
                        node.in="|";
                    }
                    while(peek()==="+" || peek()==="-"){
                        //+か-であるなら。
                        const operator=consume();
                        const right=parseTerm();
                        node={type:"BinaryExpression",operator,left: node,right};
                    }
                    if(!node){
                        console.warn(`カッコの中身がありません！`);
                        midori.errored=true;
                        return;
                    }
                    if(!node.in){
                        node.in=t;
                    }
                    return node;
                }
            }
            function parseTerm(){
                let node=parseDeepTerm();
                while(peek()==="¥\cdot"){
                    const operator=consume();
                    const right=parseDeepTerm();
                    node={type:"BinaryExpression",operator,left:node,right};
                }
                return node;
            }
            function parseDeepTerm(){
                let node=parseUnary();
                while(peek()==="^"){
                    const operator=consume();
                    const right=parseUnary();
                    node={type:"BinaryExpression",operator,left:node,right};
                }
                return node;
            }
            function findRightUnary(value){
                if(peek()==="!"){
                    var operator=peek();
                    consume();
                    return {type:"UnaryExpression",operator:operator,value:value};
                }
                return value;
            }
            function parseUnary(){
                return parsePrimary();
            }
            function parsePrimary(){
                const t = peek();
                //実数か？
                if(!isNaN(t)){
                    consume();
                    return findRightUnary({type:"Literal",value:Number(t)});
                }
                //数字でない場合
                if(/^[a-zA-Z-.-_-0-1-2-3-4-5-6-7-8-9]+$/.test(t) || t[0]=="¥"){
                    const name = consume();
                    //関数呼出しか？
                    if(peek()==="("){
                        consume();
                        var argument=[];
                        while(peek()!=")"){
                            argument.push(parseExpression());
                        }
                        consume();
                        return findRightUnary({type:"CallExpression",callee:{type:"Identifier",name},arguments:argument});
                    }
                    //関数でないなら変数
                    if(name===undefined){
                        console.warn(`構文エラー：二項演算の右辺が入力されていません。`);
                        midori.errored=true;
                    }
                    return findRightUnary({type:"Identifier",name});
                }
                //カッコなら
                if(t==="("){
                    consume();
                    const node = parseExpression(t);
                    expect(")");
                    return findRightUnary(node);
                }
                //絶対値記号
                if(t==="|"){
                    consume();
                    const node = parseExpression(t);
                    expect("|");
                    return findRightUnary(node);
                }
                console.warn(`構文エラー:${t}が理解できません。`);
                midori.errored=true;
                if(t=="-"){
                    console.warn(`おそらく[x*-y]のようにしていませんか？\n正しいスペル[x*(-y)]`);
                }
            }
            const ast=parseExpression();
            if(midori.errored){
                midori.errored=false;
                return "errorDetected";
            }
            return ast;
        },
        midoriwriter(ast){
            let tape="";
            for(let k=0; k<ast.length; ++k){
                const ask=ast[k];
                if(ask.type=="CallExpression"){
                    //あとは頼んだ
                }
            }
            return tape;
        },
        compile(tex){
            return this.midoriwriter(this.parser(this.tokenizer(tex)));
        }
    },
    fromTex(tex){
        //tex->midoriへコンパイル
        return this.f2tcompiler.compile(tex);
    }
}
midori.setting=midori.complex;
//midoriはデフォルトで複素数演算にする。

const c32={
    const(a,b){
        const c=new Float32Array(2);
        c[0]=a;
        c[1]=b;
        return c;
    },
    prod(z,x){
        return this.const(z[0]*x,z[1]*x);
    },
    exp(z){
        const r=Math.exp(z[0]);
        return this.const(r*Math.cos(z[1]),r*Math.sin(z[1]));
    },
    mul(z,w){
        const c=new Float32Array(2);
        c[0]=z[0]*w[0]-z[1]*w[1];
        c[1]=z[0]*w[1]+z[1]*w[0];
        return c;
    },
    sum(z,w){
        const c=new Float32Array(2);
        c[0]=z[0]+w[0];
        c[1]=z[1]+w[1];
        return c;
    },
    sub(z,w){
        const c=new Float32Array(2);
        c[0]=z[0]-w[0];
        c[1]=z[1]-w[1];
        return c;
    },
    abs(z){
        const c=new Float32Array(2);
        c[0]=Math.sqrt(z[0]*z[0]+z[1]*z[1]);
        return c;
    },
    normalize(z){
        return this.prod(z,1/Math.sqrt(z[0]*z[0]+z[1]*z[1]));
    },
    conjugate(z){
        const c=new Float32Array(2);
        c[0]=z[0];
        c[1]=-z[1];
        return c;
    },
    quot(z,w){
        if(w[1]==0){
            const c=new Float32Array(2);
            c[0]=z[0]/w[0];
            c[1]=z[1]/w[0];
            return c;
        }
        return this.prod(this.mul(z,this.conjugate(w)),1/(w[0]*w[0]+w[1]*w[1]));
    },
    arg(z){
        return this.const(Math.atan2(z[1],z[0]),0);
    },
    log(z){
        return this.const(Math.log(z[0]*z[0]+z[1]*z[1])/2,Math.atan2(z[1],z[0]));
    },
    pow(z,w){
        if(w[1]==0){
            const c=new Float32Array(2);
            const theta=w[0]*Math.atan2(z[1],z[0]);
            const r=Math.pow(z[0]*z[0]+z[1]*z[1],w[0]/2);
            c[0]=r*Math.cos(theta);
            c[1]=r*Math.sin(theta);
            return c;
        }else{
            //複雑な式
            const theta=Math.atan2(z[1],z[0]);
            const lnr=Math.log(z[0]*z[0]+z[1]*z[1])/2;
            const r=Math.exp(w[0]*lnr-w[1]*theta);
            const phi=w[0]*theta+w[1]*lnr;
            return this.const(r*Math.cos(phi),r*Math.sin(phi));
        }
    },
    fact(z){
        if(z[0]>=0 && z[0]%1==0 && z[1]==0){
            //自然数階乗
            let res=1;
            for(let k=1; k<=z[0]; ++k){
                res*=k;
            }
            return this.const(res,0);
        }else{
        if(z[0]<-1){
            const zaddone=this.const(z[0]+1,z[1]);
            return this.quot(this.fact(zaddone),zaddone);
        }else{
        let res=c32.const(0,0);
        for(let k=1; k<=10000; ++k){
            const rz=Math.exp(-k/100);
            const fz=this.pow(c32.const(k/100,0),z);
            res[0]+=rz*fz[0];
            res[1]+=rz*fz[1];
        }
            res[0]*=1/100;
            res[1]*=1/100;
        return res;
        }
        }
    },
    print(z){
        let operator="+";
        let x=Math.round(z[0]*1000)/1000;
        let y=Math.round(z[1]*1000)/1000;
        if(x==0){
            x="";
            if(operator=="+"){
            operator="";
            }
        }
        if(y<0){
            operator="";
        }
        if(y==0){
            return `${x}`;
        }
        if(y==1){
            y="";
        }
        if(y==-1){
            y="-";
        }
        return `${x}${operator}${y}i`;
    },
    re(z){
        return c32.const(z[0],0);
    },
    im(z){
        return c32.const(0,z[1]);
    },
    floor(z){
        return c32.const(Math.floor(z[0]),Math.floor(z[1]));
    },
    mod(z,w){
        if(z[1]==0 && w[1]==0){
            return c32.const(z[0]-w[0]*Math.floor(z[0]/w[0]),0);
        }
        return c32.sub(z,c32.mul(w,c32.floor(c32.quot(z,w))));
    },
    sin(z){
        if(z[1]==0){
            return c32.const(Math.sin(z[0]),0);
        }
        const ez=c32.exp(c32.const(-z[1],z[0]));
        const mez=c32.exp(c32.const(z[1],-z[0]));
        return c32.quot(c32.sub(ez,mez),c32.const(0,2));
    },
    cos(z){
        if(z[1]==0){
            return c32.const(Math.cos(z[0]),0);
        }
        const ez=c32.exp(c32.const(-z[1],z[0]));
        const mez=c32.exp(c32.const(z[1],-z[0]));
        return c32.prod(c32.sum(ez,mez),1/2);
    },
    tan(z){
        const ez=c32.exp(c32.const(-2*z[1],2*z[0]));
        const ezu=c32.const(ez[0]-1,ez[1]);
        const ezd=c32.const(ez[0]+1,ez[1]);
        return c32.mul(c32.const(0,-1),c32.quot(ezu,ezd));
    },
    sqrt(z){
        if(z[1]==0 && z[0]>=0){
            return c32.const(Math.sqrt(z[0]),0);
        }
        const r=Math.pow(z[0]*z[0]+z[1]*z[1],0.25);
        const theta=Math.atan2(z[1],z[0])/2;
        return c32.const(r*Math.cos(theta),r*Math.sin(theta));
    },
    int(f,C){
        //不定積分しないよ。
        //シンプソン法の方が早い...？不明なので区分求積法を使う。
        if(C[0][1]==0 && C[1][1]==0){
        const I=100000;
        let res=0;
        for(let k=1-C[0][0]*I; k<=C[1][0]*I; ++k){
            res+=f(k/I);
        }
        return new Float32Array([res/I,0]);
        }
        //経路積分は経路が与えられないといけない。
        console.warn("経路積分は未実装");
    },
    der(f){
        //fは関数である必要がある。
        //浮遊小数点の限界を感じる。
        const h=0.01;
        return z=>c32.prod(c32.sub(f(c32.const(z[0]+h,z[1])),f(z)),1/h);
    }
}
const q32={
    const(x,y,z,w){
        return new Float32Array([x,y,z,w]);
    },
    sum(u,v){
        return q32.const(u[0]+v[0],u[1]+v[1],u[2]+v[2],u[3]+v[3]);
    },
    sub(u,v){
        return q32.const(u[0]-v[0],u[1]-v[1],u[2]-v[2],u[3]-v[3]);
    },
    mul(u,v){
        if(v[1]==0 && v[2]==0 && v[3]==0){
            return q32.const(u[0]*v[0],u[1]*v[0],u[2]*v[0],u[3]*v[0]);
        }else{
        return q32.const(u[0]*v[0]-u[1]*v[1]-u[2]*v[2]-u[3]*v[3],u[0]*v[1]+u[1]*v[0]+u[2]*v[3]-u[3]*v[2],u[0]*v[2]+u[2]*v[0]+u[3]*v[1]-u[1]*v[3],u[0]*v[3]+u[3]*v[0]+u[1]*v[2]-v[1]*u[2]);
        }
    },
    prod(u,scalar){
        return q32.const(u[0]*scalar,u[1]*scalar,u[2]*scalar,u[3]*scalar);
    },
    quot(u,v){
        if(v[1]==0 && v[2]==0 && v[3]==0){
            return q32.const(u[0]/v[0],u[1]/v[0],u[2]/v[0],u[3]/v[0]);
        }else{
        const r2=v[0]*v[0]+v[1]*v[1]+v[2]*v[2]+v[3]*v[3];
        return q32.mul(u,q32.const(v[0]/r2,-v[1]/r2,-v[2]/r2,-v[3]/r2));
        }
    },
    conjugate(u){
        return q32.const(u[0],-u[1],-u[2],-u[3]);
    },
    pow(u,v){
        if(v[1]==0 && v[2]==0 && v[3]==0){
            //ドモアブルの公式の拡張
            const n=q32.normal(u);
            const r=Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]+u[3]*u[3]);
            if(r==0){
                //多くの電子計算機を踏襲し、0^0=1とする。
                return q32.const(1,0,0,0);
            }
            const theta=v[0]*Math.acos(u[0]/r);
            const sin=Math.sin(theta);
            const rv=Math.pow(r,v[0]);
            return q32.const(rv*Math.cos(theta),rv*sin*n[1],rv*sin*n[2],rv*sin*n[3]);
        }else{
            //非常に複雑なので、最適化は考えない(たくない)
            const n=q32.normal(u);
            const r2=u[0]*u[0]+u[1]*u[1]+u[2]*u[2]+u[3]*u[3];
            if(r2==0){
                return q32.const(1,0,0,0);
            }
            return q32.exp(q32.mul(v,q32.const(Math.log(r2)/2,n[1],n[2],n[3])));
        }
    },
    exp(u){
        //かなり複雑
        const vsiz=Math.sqrt(u[1]*u[1]+u[2]*u[2]+u[3]*u[3]);
        if(vsiz==0){
            return q32.const(Math.exp(u[0]),0,0,0);
        }
        const v=q32.const(0,u[1]/vsiz,u[2]/vsiz,u[3]/vsiz);//normal
        const r=Math.exp(u[0]);
        const rsin=r*Math.sin(vsiz);
        return q32.const(r*Math.cos(vsiz),rsin*v[1],rsin*v[2],rsin*v[3]);
    },
    abs(u){
        return q32.const(Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]+u[3]*u[3]),0,0,0);
    },
    arg(u){
        return q32.const(Math.acos(u[0]/Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]+u[3]*u[3])),0,0,0);
    },
    normal(u){
        if(u[1]==0 && u[2]==0 && u[3]==0){
            return q32.const(0,0,0,0);
        }
        const abu=Math.sqrt(u[1]*u[1]+u[2]*u[2]+u[3]*u[3]);
        return q32.const(0,u[1]/abu,u[2]/abu,u[3]/abu);
    }
}