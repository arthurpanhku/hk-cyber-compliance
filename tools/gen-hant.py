#!/usr/bin/env python3
"""
从简体基础数据生成繁体中文层 data/i18n/zh-Hant.js。

繁体版不手动维护：改动请改简体原文（data/*.js、data/i18n/zh-Hans.js）后重新运行本脚本。

    pip install opencc-python-reimplemented
    python3 tools/gen-hant.py

转换器用 s2hk（简体 → 繁体·香港标准），因此得到的是「網絡／軟件／私隱」
一类香港用词，而非台湾用词（網路／軟體）。OVERRIDES 用于修正 s2hk
在本项目专业词汇上的个别偏差。
"""

import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'data' / 'i18n' / 'zh-Hant.js'
README_SRC = ROOT / 'README.zh-Hans.md'
README_OUT = ROOT / 'README.zh-Hant.md'

# 语言导航列：转换后整行替换，让「繁體／简体」两个标签各自保持自己的字体。
NAV_HANT = ('    <strong>繁體</strong> · <a href="README.zh-Hans.md">简体</a>'
            ' · <a href="README.md">English</a>')

# 逐字修正：s2hk 采用教育局《常用字字形表》的字形（户／説／啓／羣／温），
# 但香港法例（电子版香港法例）与金管局、证监会发布的中文文件用的是
# 戶／說／啟／群／溫。本工具的用途是对照监管文件，故一律改回后者。
OVERRIDES = {
    '平颱': '平台', # OpenCC 会把「平台风险」误拆成「平颱風險」
    '户': '戶',   # 客戶、用戶、賬戶
    '説': '說',
    '啓': '啟',
    '羣': '群',
    '温': '溫',
    '閲': '閱',   # 《個人資料（私隱）條例》的法定用語為「查閱資料要求」
    # 面向香港从业者的界面与网络安全常用词。
    '訪問': '存取',
    '數據': '資料',
    '服務器': '伺服器',
    '登錄': '登入',
    '托管': '託管',
    '導出': '匯出',
    '導入': '匯入',
    '打印': '列印',
    '搜索': '搜尋',
    '鏈接': '連結',
    '默認': '預設',
    '字段': '欄位',
    '運行': '執行',
    '構建': '建置',
    '響應時間': '回應時間',
    '賬戶': '帳戶',
}
# 刻意不改的字：「防衞」保留 衞，与香港政府用字一致（衞生署、網絡防衞評估架構）。


def dump_base():
    """借 node 载入数据文件并输出 JSON，避免用正则解析 JS。"""
    script = r'''
    global.window = {};
    require('./data/_registry.js');
    global.HKCC = window.HKCC;
    require('./data/sources.js');
    require('./data/taxonomy.js');
    const fs = require('fs');
    for (const f of fs.readdirSync('data/controls').sort()) require('./data/controls/' + f);
    require('./data/i18n/zh-Hans.js');
    process.stdout.write(JSON.stringify({
      ui: HKCC.i18n['zh-Hans'].ui,
      sources: HKCC.sources,
      licenses: HKCC.licenses,
      attributes: HKCC.attributes,
      domains: HKCC.domains,
      controls: HKCC.controls
    }));
    '''
    res = subprocess.run([ 'node', '-e', script ], cwd=ROOT,
                         capture_output=True, text=True)
    if res.returncode != 0:
        sys.exit('无法载入数据文件：\n' + res.stderr)
    return json.loads(res.stdout)


def main():
    try:
        import opencc
    except ImportError:
        sys.exit('缺少依赖：pip install opencc-python-reimplemented')

    cc = opencc.OpenCC('s2hk')

    def conv(text):
        if not text:
            return text
        out = cc.convert(text)
        for a, b in OVERRIDES.items():
            out = out.replace(a, b)
        return out

    def pick(obj, fields):
        """只取有值的字段，避免生成一堆空键。"""
        return {f: conv(obj[f]) for f in fields if obj.get(f)}

    base = dump_base()

    out = {
        'ui': {k: conv(v) for k, v in base['ui'].items()},
        'licenses': {x['id']: pick(x, ('group', 'label', 'note')) for x in base['licenses']},
        'attributes': {x['id']: pick(x, ('label', 'note')) for x in base['attributes']},
        'domains': {x['id']: pick(x, ('label', 'desc')) for x in base['domains']},
        # titleEn / url / issued 不转换；regulator 只有 OCCICS 一项是中文。
        'sources': {k: pick(v, ('titleZh', 'legalStatus', 'regulator'))
                    for k, v in base['sources'].items()},
        'controls': {c['id']: pick(c, ('title', 'requirement', 'note', 'clause'))
                     for c in base['controls']},
    }

    body = json.dumps(out, ensure_ascii=False, indent=2)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        '/**\n'
        ' * 繁體中文層（香港用字）。\n'
        ' *\n'
        ' * 本檔由 tools/gen-hant.py 以 OpenCC s2hk 從簡體原文自動生成，請勿手動修改：\n'
        ' * 任何改動都會在下次生成時被覆蓋。要改繁體文字，請改簡體原文\n'
        ' *（data/taxonomy.js、data/sources.js、data/controls/*.js、data/i18n/zh-Hans.js）\n'
        ' * 後重新執行生成指令；個別專有名詞的例外寫法請加入該腳本的 OVERRIDES。\n'
        ' *\n'
        ' * quote 欄位為英文來源文字，quoteStatus 標明原文、節錄或說明；任何語言下均不翻譯。\n'
        ' */\n'
        "HKCC.addI18n('zh-Hant', " + body + ');\n',
        encoding='utf-8')

    n = len(out['controls'])
    print(f'已生成 {OUT.relative_to(ROOT)}：{n} 条控制点、'
          f"{len(out['ui'])} 条界面字符串、{len(out['sources'])} 份条文出处。")

    gen_readme(conv)


def gen_readme(conv):
    """README.zh-Hans.md → README.zh-Hant.md。"""
    if not README_SRC.exists():
        print(f'跳过 README：找不到 {README_SRC.name}')
        return

    text = README_SRC.read_text(encoding='utf-8')

    # 围栏代码块内的单引号字符串是简体源码的实际内容，转成繁体就与仓库里的
    # 文件对不上了，故先抽出、转换后再放回。代码块中的注释仍会转换。
    stash = []

    def protect(match):
        stash.append(match.group(0))
        return f'\x00{len(stash) - 1}\x00'

    text = re.sub(r'```.*?```',
                  lambda m: re.sub(r"'[^'\n]*'", protect, m.group(0)),
                  text, flags=re.S)

    out = conv(text)
    for i, original in enumerate(stash):
        out = out.replace(f'\x00{i}\x00', original)

    # 换成繁体版导航列
    out, count = re.subn(r'(?<=<!-- lang-nav -->\n).*', NAV_HANT, out, count=1)
    if not count:
        sys.exit('README.zh-Hans.md 中找不到 <!-- lang-nav --> 标记')

    README_OUT.write_text(out, encoding='utf-8')
    print(f'已生成 {README_OUT.relative_to(ROOT)}（由 {README_SRC.name} 转换）。')


if __name__ == '__main__':
    main()
