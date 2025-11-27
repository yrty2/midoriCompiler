midoriは、数学言語をjavascriptへコンパイルするライブラリです。

# 使い方

midori.run("1+1")とコンソール上で入力して実行してみてください。すると、float32[2,0]という配列を返すはずです。

なぜ配列なのかというと、midoriは複素数を想定して計算するためです。<-この辺は自由に変えられます。

例えば、midori.run("1+2i")を実行すると、float32[1,2]を返します。

より詳しい説明は、Documentationのページを御覧ください。

# インストール
midoriCompiler.jsをダウンロード(あるいはコピペ)して、htmlに<script src="midoriCompiler.js"></script>とタグを追加するだけです。

CDNを検討中
