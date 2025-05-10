cd "$(dirname $0)"
set -ex

cd public
for filename in *.webm
do
    echo $filename
    ffmpeg \
        -i $filename \
        -vf "fps=15,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" \
        $filename.gif
    rm $filename
done
