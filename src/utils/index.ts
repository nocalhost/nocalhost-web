/**
 * 下载文件
 * @param url
 * @param options
 */
export function download(
    url: string,
    options?: {
        // 下载文件名
        fileName?: string;
    }
) {
    const { fileName } = options ?? {};

    return fetch(url).then(async (res) => {
        const blob = await res.blob();

        const fileUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.href = fileUrl;
        link.download = fileName || '下载文件';

        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(link.href);
    });
}
